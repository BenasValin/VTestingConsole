const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const dbOperation = require("./dbFiles/dbOperation");
const bodyParser = require("body-parser");

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/searchnextstep", async (req, res) => {
  const id = req.body.id; // Extract id from req.body
  try {
    let deviceInfo = await dbOperation.searchNextStep(id);
    res.json(deviceInfo.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/updatedevicedata", async (req, res) => {
  const { id, testName, results } = req.body;
  try {
    let deviceInfo = await dbOperation.updateDeviceData(id, testName, results);
    res.json(deviceInfo.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/registernewdevice", async (req, res) => {
  const category = req.body.category;
  try {
    let info = await dbOperation.registerNewDevice(category);
    res.json(info.id);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/generatepdf", async (req, res) => {
  const htmlContent = req.body.htmlContent;

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=device_report.pdf"
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
