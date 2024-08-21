import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rejectionReasons from "../rejectionReasons.json";
import { useHandleTestInput } from "../Functions/Functions";
import "./RejectionReason.css";

export default function RejectionReason() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const rejectionCategory = searchParams.get("rejectionCategory");
  const handleTestInput = useHandleTestInput();
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState("");
  const [showOtherReasons, setShowOtherReasons] = useState(!rejectionCategory);

  const handleReasonSelection = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleRejectionReasonInput = async () => {
    const id = searchParams.get("id");

    if (selectedReason) {
      await handleTestInput(id, rejectionCategory, () => selectedReason);
      navigate(`/report?id=${id}`);
    } else {
      console.log("No reason selected");
    }
  };

  const mainReasons = rejectionReasons[rejectionCategory] || [];

  const otherReasonsByCategory = Object.keys(rejectionReasons).reduce(
    (acc, category) => {
      if (category !== rejectionCategory) {
        acc[category] = rejectionReasons[category];
      }
      return acc;
    },
    {}
  );

  const toggleOtherReasons = (event) => {
    event.preventDefault();
    setShowOtherReasons(!showOtherReasons);
  };

  return (
    <div className="reportContainer">
      <h2>Rejection reasons for category: {rejectionCategory}</h2>
      <form>
        <div>
          {mainReasons.map((reason, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`mainReason${index}`}
                name="rejectionReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={handleReasonSelection}
              />
              <label htmlFor={`mainReason${index}`}>{reason}</label>
            </div>
          ))}
        </div>

        {Object.keys(otherReasonsByCategory).length > 0 && (
          <div>
            <button type="button" onClick={toggleOtherReasons}>
              {showOtherReasons
                ? "Hide other categories"
                : "Show other categories"}
            </button>
            {showOtherReasons && (
              <div>
                <h3>Other Reasons</h3>
                {Object.keys(otherReasonsByCategory).map(
                  (category, catIndex) => (
                    <div className="otherCategoryContainer" key={catIndex}>
                      <h4 className="otherCategoryHeader">{category}</h4>
                      {otherReasonsByCategory[category].map((reason, index) => (
                        <div key={`${category}-${index}`}>
                          <input
                            type="radio"
                            id={`otherReason${category}-${index}`}
                            name="rejectionReason"
                            value={reason}
                            checked={selectedReason === reason}
                            onChange={handleReasonSelection}
                          />
                          <label htmlFor={`otherReason${category}-${index}`}>
                            {reason}
                          </label>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </form>

      <button onClick={handleRejectionReasonInput}>Submit reason</button>
    </div>
  );
}
