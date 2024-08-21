// Functions.jsx

import { useNavigate } from "react-router-dom";
import testingStepOrder from "../testingStepOrder.json";

const fetchDeviceInfo = async (id) => {
  if (id === "") {
    window.alert("Please fill up the id input box");
    return;
  }
  try {
    const response = await fetch("http://localhost:5000/api/searchnextstep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data[0]);
    return data[0];
  } catch (error) {
    console.error("Error fetching device info:", error);
  }
};

const RedirectToTestingComponentURL = (data) => {
  const id = data.id;
  const dataArray = Object.entries(data);
  const testingStepOrder = require("../testingStepOrder.json");

  if (!data.category || !testingStepOrder[data.category]) {
    console.error("Invalid or missing category:", data.category);
    return `/report?id=${id}`;
  }

  let url = `/report?id=${id}`;
  for (let step of testingStepOrder[data.category]) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i][0] === step && dataArray[i][1] === null) {
        return `/${step}?id=${id}`;
      }
    }
  }

  return url;
};

const updateDeviceData = async (id, testName, results) => {
  try {
    const response = await fetch("http://localhost:5000/api/updatedevicedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, testName, results }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text(); // Use text() instead of json()
    return data; // Return text directly
  } catch (error) {
    console.error("Error updating device data:", error);
    // Handle error state or UI feedback here
    throw error; // Propagate the error to handle it in the caller
  }
};

const registerNewDevice = async (category) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/registernewdevice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating device data:", error);
    throw error;
  }
};

const useHandleTestInput = () => {
  const navigate = useNavigate();

  const handleTestInput = async (id, testName, getInputValue) => {
    if (!getInputValue) window.alert("Prašome paspausti vieną iš pasirinkimų");
    try {
      const inputValue = getInputValue();
      await updateDeviceData(id, testName, inputValue.toString());
      if (inputValue === false || inputValue === "ne" || inputValue === "NOK") {
        navigate(`/rejectionreason?id=${id}&rejectionCategory=${testName}`);
        return;
      }
      const data = await fetchDeviceInfo(id);
      if (!data) {
        console.log("No device found or error occurred after updating");
        return;
      }
      const navigationURL = RedirectToTestingComponentURL(data);
      if (navigationURL) {
        navigate(navigationURL); // Use navigate function here
      } else {
        console.log("No navigation URL found");
      }
    } catch (error) {
      console.error(`Error handling ${testName} input:`, error);
      // Handle error state or UI feedback here
    }
  };

  return handleTestInput;
};

const isValueSuccessful = (value) => {
  const successfulValues = ["OK", "A+", "A", "B", "C", "N/A", true, "true"];

  for (let val of successfulValues) {
    if (value === val) {
      return true;
    }
  }

  return false;
};

export {
  fetchDeviceInfo,
  RedirectToTestingComponentURL,
  updateDeviceData,
  useHandleTestInput,
  isValueSuccessful,
  registerNewDevice,
};
