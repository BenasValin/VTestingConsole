import "./ID.css";
import {
  fetchDeviceInfo,
  RedirectToTestingComponentURL,
  isValueSuccessful,
} from "../Functions/Functions";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import stepDisplayNames from "../Report/ReportHTML";
import generateTestStatusImage from "../Report/ReportHTML";
import TestingStepsOrder from "../testingStepOrder.json";
import checkIcon from "../Images/green-check-icon.png";
import crossIcon from "../Images/red-cross-icon.png";
import { yellowArrow } from "../Report/ReportHTML";

export default function ID() {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialId = searchParams.get("id");

  // Function to fetch data based on ID
  const fetchData = async (id) => {
    try {
      const data = await fetchDeviceInfo(id);
      if (data) {
        setDeviceInfo(data);
        setCategory(data.category || "");
        setCurrentId(data.id);
        return data;
      } else {
        setDeviceInfo({});
        setCategory("");
      }
    } catch (error) {
      console.error("Error fetching device info:", error);
      setDeviceInfo({});
      setCategory("");
    }
  };

  useEffect(() => {
    fetchData(initialId);
  }, [location.pathname]);

  const handleIdChange = (event) => {
    setCurrentId(event.target.value);
  };

  const handleFetch = async () => {
    if (currentId == "") {
      window.alert("Please fill up the id input box");
      return;
    }
    const data = await fetchData(currentId);
    if (data) {
      const url = RedirectToTestingComponentURL(data);
      console.log(url);
      navigate(url);
    } else console.error("Error fetching data");
  };

  const handleHomeButton = () => {
    setDeviceInfo({});
    setCategory("");
    setCurrentId("");
    navigate("/");
  };

  const handleReportButton = () => {
    if (!currentId) {
      window.alert("Įveskite įrenginio ID");
      return;
    }
    navigate(`/report?id=${currentId}`);
  };

  const renderTest = (step, value) => {
    const displayName = stepDisplayNames[step] || step;
    return (
      <div key={step} className="IDtestdiv">
        <div className="test-name">
          <b>{displayName}:</b>
        </div>
        <img
          className="IDcheckIcon"
          src={isValueSuccessful(value) ? checkIcon : crossIcon}
          alt={value}
        />
        <b className="test-value">{value}</b>
      </div>
    );
  };

  return (
    <div className="headerContainer">
      <div className="homeBtn">
        <button onClick={handleHomeButton}>Home</button>
        <img src="" alt="" />
      </div>

      <div className="idContainer">
        <label htmlFor="Id" className="id">
          ID:
        </label>
        <input
          type="text"
          id="Id"
          value={currentId}
          onChange={handleIdChange}
        />
        <button onClick={handleFetch}>Search</button>
        <div className="homeBtn">
          <button onClick={handleReportButton}>Report page</button>
          <img src="" alt="" />
        </div>
      </div>

      <div className="infoContainer">
        <b>{initialId ? `ID: ${initialId}` : ``}</b>
        {Object.entries(deviceInfo)
          .filter(([key]) => TestingStepsOrder[category]?.includes(key))
          .map(([key, value]) => renderTest(key, value, deviceInfo.category))}
      </div>
    </div>
  );
}
