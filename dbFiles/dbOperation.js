const config = require("./dbConfig"),
  sql = require("mssql");

function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return randomNumber;
}

const searchNextStep = async (id) => {
  try {
    let pool = await sql.connect(config);
    let query = `SELECT * FROM dbo.devices WHERE ID = ${id}`;
    let deviceInfo = await pool.request().query(query);
    return deviceInfo;
  } catch (error) {
    console.log(error);
  }
};

const updateDeviceData = async (id, testName, results) => {
  try {
    let pool = await sql.connect(config);
    let query = `Update dbo.devices
        set ${testName} = '${results}'
        where id = ${id}`;
    console.log(query);
    let querySuccess = await pool.request().query(query);
    return querySuccess;
  } catch (error) {
    console.log(error);
  }
};

const registerNewDevice = async (category) => {
  try {
    let id = generateRandomId(); //Right now it generates a completely random ID. it can even be a duplicate of some other device. TODO - fix this
    let pool = await sql.connect(config);
    let query = `
            SET IDENTITY_INSERT dbo.devices ON;
            INSERT INTO dbo.devices (id, category) 
            VALUES (${id}, '${category}');
            SET IDENTITY_INSERT dbo.devices OFF;
        `;

    console.log(query);
    let querySuccess = await pool.request().query(query);
    return { id, querySuccess };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searchNextStep,
  updateDeviceData,
  registerNewDevice,
};
