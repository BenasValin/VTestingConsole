import { useRef } from "react";
import { fetchDeviceInfo, useHandleTestInput } from "../Functions/Functions";
import userEvent from "@testing-library/user-event";

export default function SerialNumber() {
  const textRef = useRef();
  const handleTestInput = useHandleTestInput();

  const getInput = () => {
    if (!textRef.current.value) {
      window.alert("Please fill up the input box");
      return;
    }

    console.log(textRef.current.value);
    return textRef.current.value;
  };

  const handleClick = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    if (textRef.current.value)
      await handleTestInput(id, "serialnumber", getInput);
  };

  return (
    <div className="testingComponentContainer">
      <h3>SerialNumber/IMEI</h3>
      <input type="text" ref={textRef} />
      <button className="testingComponentBtn" onClick={handleClick}>
        Enter
      </button>
    </div>
  );
}
