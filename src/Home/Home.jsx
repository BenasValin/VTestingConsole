import React, { useState, useRef } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import {
  fetchDeviceInfo,
  RedirectToTestingComponentURL,
  registerNewDevice,
} from "../Functions/Functions";

export default function Home() {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");

  const handleRegister = async () => {
    if (selectedDeviceType === "") {
      window.alert("Please select a device type");
      return;
    }
    const newDeviceId = await registerNewDevice(selectedDeviceType);
    if (newDeviceId) handleRedirect(newDeviceId);
  };

  const handleRedirect = async (newId) => {
    const id = newId || idRef.current.value;
    if (id === "") {
      window.alert("Please fill up the id input box");
      return;
    }
    navigate(`/?id=${id}`);
    fetchData(id);
  };

  const fetchData = async (id) => {
    const data = await fetchDeviceInfo(id);
    if (data) {
      const navigationURL = RedirectToTestingComponentURL(data);
      navigate(navigationURL);
    } else {
      console.log("No device found or error occurred");
    }
  };

  const handleDeviceTypeChange = (event) => {
    setSelectedDeviceType(event.target.value);
  };

  return (
    <div className="homeContainer">
      <div className="registrationContainer">
        <h3>Register a new device</h3>
        <div className="deviceRegistrationCategory">
          <label htmlFor="consoles">
            <input
              id="consoles"
              name="deviceType"
              type="radio"
              value="consoles"
              checked={selectedDeviceType === "consoles"}
              onChange={handleDeviceTypeChange}
            />
            Video game console
          </label>
          <label htmlFor="laptops">
            <input
              id="laptops"
              name="deviceType"
              type="radio"
              value="laptops"
              checked={selectedDeviceType === "laptops"}
              onChange={handleDeviceTypeChange}
            />
            Laptop
          </label>
          <label htmlFor="smartwatches">
            <input
              id="smartwatches"
              name="deviceType"
              type="radio"
              value="smartwatches"
              checked={selectedDeviceType === "smartwatches"}
              onChange={handleDeviceTypeChange}
            />
            Smartwatch
          </label>
          <label htmlFor="audio">
            <input
              id="audio"
              name="deviceType"
              type="radio"
              value="audio"
              checked={selectedDeviceType === "audio"}
              onChange={handleDeviceTypeChange}
            />
            Audio gear
          </label>
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="searchContainer">
        <h3>Search by ID:</h3>
        <input type="text" id="deviceId" ref={idRef} />
        <button onClick={() => handleRedirect(null)}>Search</button>
      </div>
    </div>
  );
}
