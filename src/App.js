import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ID from "./ID/ID";
import TurnsOn from "./Tests/TurnsOn";
import Screen from "./Tests/Screen";
import Home from "./Home/Home";
import Body from "./Tests/Body";
import Controllers from "./Tests/Controllers";
import Report from "./Report/Report";
import Ports from "./Tests/Ports";
import Accounts from "./Tests/Accounts";
import RejectionReason from "./RejectionReason/RejectionReason";
import SmellsNoises from "./Tests/SmellsNoises";
import WiFi from "./Tests/WiFi";
import OpticalDiskDrive from "./Tests/OpticalDiskDrive";
import LoadTest from "./Tests/LoadTest";
import SerialNumber from "./Tests/SerialNumber";

function App() {
  return (
    <Router>
      <ID />
      <div className="app">
        <Routes>
          <Route path="/turnson" element={<TurnsOn />} />
          <Route path="/screen" element={<Screen />} />
          <Route path="/body" element={<Body />} />
          <Route path="/controllers" element={<Controllers />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/ports" element={<Ports />} />
          <Route path="/smellsnoises" element={<SmellsNoises />} />
          <Route path="/wifi" element={<WiFi />} />
          <Route path="/opticaldiskdrive" element={<OpticalDiskDrive />} />
          <Route path="/loadtest" element={<LoadTest />} />
          <Route path="/rejectionreason" element={<RejectionReason />} />
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/serialnumber" element={<SerialNumber />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
