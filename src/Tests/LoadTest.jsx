import { useRef } from 'react';
import { fetchDeviceInfo, useHandleTestInput } from '../Functions/Functions';

export default function LoadTest() {
    const taipRef = useRef();
    const neRef = useRef();
    const handleTestInput = useHandleTestInput();

    const getRadioInputBool = () => {
        if (taipRef.current.checked) return "OK";
        return "NOK";
    };


    const handleClick = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        await handleTestInput(id, 'loadtest', getRadioInputBool);
    };

    return (
        <div className='testingComponentContainer'>
            <h3>Load test</h3>
            <h4>is the device stable?</h4>
            <div className='inputGrid'>
                <label className='OKInputContainer' htmlFor="taip">
                    <input id="taip" name="turnson" type="radio" ref={taipRef} />
                    Yes
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
