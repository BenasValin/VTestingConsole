import React, { useEffect, useState } from "react";
import { fetchDeviceInfo } from "../Functions/Functions"; // Adjust path as necessary
import "./Report.css";
import { useNavigate, useLocation } from "react-router-dom";
import checkIcon from "../Images/green-check-icon.png";
import crossIcon from "../Images/red-cross-icon.png";
import { isValueSuccessful } from "../Functions/Functions";
import generateHTMLContent from "./ReportHTML";
import TestingStepsOrder from "../testingStepOrder.json";
import { stepDisplayNames } from "./ReportHTML";

const Report = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    const fetchData = async () => {
      try {
        const data = await fetchDeviceInfo(id); // Assuming fetchDeviceInfo is a function that returns device info based on id
        setDeviceInfo(data); // Assuming data is an object with device information
      } catch (error) {
        console.error("Error fetching device info:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [location]);

  const handleRepeatTest = (testName, id) => {
    navigate(`/${testName}?id=${id}`);
  };

  const handleMakeReport = async () => {
    setReportLoading(true);

    try {
      const htmlContent = generateHTMLContent(deviceInfo); // Generate HTML content dynamically

      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Trigger PDF generation and download
      const response = await fetch("http://localhost:5000/api/generatepdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlContent }), // Send HTML content as JSON
      });

      if (response.ok) {
        const blob = await response.blob(); // Get the response body as a blob

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "device_report.pdf"; // Set the file name for download
        document.body.appendChild(a); // Append the link to the document body
        a.click(); // Programmatically click the link to trigger download
        document.body.removeChild(a); // Clean up: remove the link from the document body
      } else {
        throw new Error("Failed to convert HTML to PDF"); // Throw an error if conversion fails
      }
    } catch (error) {
      console.error("Error converting HTML to PDF:", error); // Log any errors that occur
    } finally {
      setReportLoading(false); // Finally, set loading state to false
    }
  };

  const renderTest = (step, value) => {
    const displayName = stepDisplayNames[step] || step;
    return (
      <div key={step} className="testdiv">
        <div className="test-name">
          <b>{displayName}</b>
        </div>
        <img
          className="checkIcon"
          src={isValueSuccessful(value) ? checkIcon : crossIcon}
          alt={value}
        />
        <b className="test-value">{value}</b>
        <button onClick={() => handleRepeatTest(step, deviceInfo.id)}>
          Repeat test
        </button>
      </div>
    );
  };

  return (
    <div className="reportContainer">
      {deviceInfo ? (
        <>
          <h2>Device information</h2>
          <div className="deviceReportInfo">
            {Object.entries(deviceInfo)
              .filter(([key]) =>
                TestingStepsOrder[deviceInfo.category]?.includes(key)
              )
              .map(([key, value]) => renderTest(key, value))}
          </div>
          <button
            className="makeReportBtn"
            onClick={handleMakeReport}
            disabled={reportLoading}
          >
            {reportLoading ? "Loading..." : "Download report"}
          </button>
          <div className="reportPreview"></div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Report;
