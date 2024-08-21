import { isValueSuccessful } from "../Functions/Functions";
import TestingStepsOrder from "../testingStepOrder.json";
export const crossIcon = "https://i.postimg.cc/7hmHP7hV/cross.jpg";
export const checkIcon = "https://i.postimg.cc/Qtdjytcp/check.jpg";
export const yellowArrow =
  "https://i.postimg.cc/nhLnybW7/yellow-arrow-icon.png";

export const generateTestStatusImage = (value) => {
  const successfulValues = ["OK", "A+", "A", "B", "C", "N/A", true, "true"];

  for (let val of successfulValues) {
    if (value === val) {
      return checkIcon;
    }
  }
  if (value == null) return yellowArrow;
  else return crossIcon;
};

export const stepDisplayNames = {
  turnson: "Does the device turn on?",
  screen: "Screen condition",
  opticaldiskdrive: "Optical disk drive",
  body: "Body condition",
  ports: "Ports",
  controllers: "Controller condition",
  accounts: "No locked accounts",
  wifi: "Wi-Fi",
  smellsnoises: "Unusual smells or noises",
  loadtest: "Load test",
  serialnumber: "Serial number",
};

const generateHTMLContent = (deviceInfo) => {
  if (!deviceInfo) return "";

  const category = deviceInfo.category;
  const steps = TestingStepsOrder[category] || [];
  const testDivs = steps
    .map((step) => {
      const displayName = stepDisplayNames[step] || step;
      return `
            <div class="testdiv">
                <div class="test-name"><b>${displayName}:</b></div>
                <img class="checkIcon" src="${generateTestStatusImage(
                  deviceInfo[step]
                )}" />
                <b class="test-value">${
                  deviceInfo[step] == null ? `Not Performed` : deviceInfo[step]
                }</b>
            </div>
        `;
    })
    .join("");

  return `
        <html>
           <head>
                <title>Device Report</title>
                <style>
                    body{   
                            margin: auto;
                            box-sizing: border-box;
                            width: 21cm;
                            height: 29.7cm;
                            padding: 2rem 3rem 2rem 3rem;
                            font-family: Arial, sans-serif;
                    } 
                    .LogoContainer{
                        display: grid;
                        width: fit-content;
                        grid-template-columns: 200px auto;
                        margin-left: auto;
                    }
                    .inspectionHeader{
                        height: fit-content;
                        display: flex;
                        margin: 1rem 0 1rem
                    }
                    .inspectionHeaderText{
                        margin: 0 0 10px 10px;
                    }
                    .restorieLogo{
                        height: 60px;
                    }
                    .secondaryText{
                        color: rgb(83, 83, 83);
                    }
                    .checkIcon{
                        height: 30px;
                    }
                    .testdiv{
                        display: grid;
                        grid-template-columns: 200px 30px 1fr;
                        align-items: center;
                        gap: 1rem;
                    }
                    .firstPageReport{
                        display: grid;
                        grid-template-columns: 150px auto;
                    }
                    .firstPageReport > *{
                        padding: 1rem 0 1rem
                    }
                    .deviceIdentificators{
                        display: flex;
                        flex-direction: column;
                        border-bottom: 1px solid black;
                    }
                    .conditionGradingContainer{
                        display: flex;
                        gap: 1rem;
                        border-bottom: 1px solid black;
                    }
                    .conditionGrading{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        
                    }
                    .noMargin{
                        margin: 0;
                    }
                    .testResults{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    }
                    .disclaimer{
                    margin-top: 100px;
                    }
                </style>
            </head>
           <body>
                <div class="container">
                    <div class="LogoContainer">
                        <p>
                            Help make second-hand the first choice worldwide <b>???.com</b>
                        </p>
                       
                    </div>
                    <div class="inspectionHeader">
                        <img class="restorieLogo" src='https://i.postimg.cc/MpccT9LC/Restorie-logo-symbol-black-4x-100.jpg'>
                        <div>
                            <h2 class="inspectionHeaderText">Your video game console has been inspected!</h2>
                            <h3 class="inspectionHeaderText secondaryText"> Restorie device inspection Report</h3>
                        </div>
                    </div>
                    <div class="firstPageReportContainer">
                        <div class="firstPageReport">
                            <h3 class="noMargin">Device model & identificators</h3>
                            <div class="deviceIdentificators">
                                <a>Model: <b>${deviceInfo.id}</b> </a>
                                <a>Serial Number:<b>4323DFSD</b> </a>
                            </div>
                            
                            <h3 class="noMargin">Condition grading</h3>
                            <div class="conditionGradingContainer">
                            ${
                              deviceInfo.screen
                                ? ` <div class="conditionGrading">
                                    <a>Screen:</a>
                                    <h2 class="noMargin">${deviceInfo.screen}</h2>
                                </div>`
                                : ``
                            }
                            ${
                              deviceInfo.body
                                ? ` <div class="conditionGrading">
                                    <a>Screen:</a>
                                    <h2 class="noMargin">${deviceInfo.body}</h2>
                                </div>`
                                : ``
                            }
                            </div>
                        </div>
                    </div>
                    <div class="testResults">
                        <p><b>ID:</b> 1324</p>
                        ${testDivs}
                    </div>
                </div>
                <i class="disclaimer">If one of the tests fails, the testing process is stopped therefore other tests are <b>not performed</b></i>
            </body>
        </html>
    `;
};

export default generateHTMLContent;
