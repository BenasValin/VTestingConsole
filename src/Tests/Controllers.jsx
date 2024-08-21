import { useRef } from 'react';
import { fetchDeviceInfo, useHandleTestInput } from '../Functions/Functions';
export default function Controllers() {
    const taipRef = useRef();
    const neRef = useRef();
    const NARef = useRef();
    const handleTestInput = useHandleTestInput();

    const getRadioInputBool = () => {
        if (taipRef.current.checked) return "OK"
        if (NARef.current.checked) return "N/A";
        return "NOK";
    };


    const handleClick = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        await handleTestInput(id, 'controllers', getRadioInputBool);
    };

    return (
        <div className='testingComponentContainer'>
            <h3>Do the controllers work?</h3>
            <div className='inputGrid'>
                <label className='OKInputContainer' htmlFor="taip">
                    <input id="taip" name="turnson" type="radio" ref={taipRef} />
                    Yes
                </label>
                <label htmlFor="N/A" className='OKInputContainer'>
                    <input id="N/A" name="turnson" type="radio" ref={NARef} />
                    Device doesn't have controllers
                </label>
                <label htmlFor="ne" className='NOKInputContainer'>
                    <input id="ne" name="turnson" type="radio" ref={neRef} />
                    No
                </label>
            </div>
            <button className='testingComponentBtn' onClick={handleClick}>Enter</button>
        </div>
    );
}
