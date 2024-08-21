import { useRef } from 'react';
import { useHandleTestInput } from '../Functions/Functions';
export default function Body() {
    const taipRef = useRef();
    const neRef = useRef();
    const handleTestInput = useHandleTestInput();

    const getRadioInput = () => {
        const inputs = document.querySelectorAll('input[name="turnson"]');
        for (const input of inputs) {
            if (input.checked) {
                return input.value;
            }
        }
        return null;
    };

    const handleClick = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        await handleTestInput(id, 'body', getRadioInput);
    };

    return (
        <div className='testingComponentContainer'>
            <h3>Body condition?</h3>
            <div className='inputGrid'>
                <label className='OKInputContainer' htmlFor="A+">
                    <input id="A+" name="turnson" type="radio" value="A+" ref={taipRef} />
                    A+
                </label>
                <label htmlFor="A" className='OKInputContainer'>
                    <input id="A" name="turnson" type="radio" value="A" ref={neRef} />
                    A
                </label>
                <label htmlFor="B" className='OKInputContainer'>
                    <input id="B" name="turnson" type="radio" value="B" ref={neRef} />
                    B
                </label>
                <label htmlFor="C" className='OKInputContainer'>
                    <input id="C" name="turnson" type="radio" value="C" ref={neRef} />
                    C
                </label>
                <label htmlFor="NOK" className='NOKInputContainer'>
                    <input id="NOK" name="turnson" type="radio" value="NOK" ref={neRef} />
                    NOK
                </label>
            </div>
            <button className='testingComponentBtn' onClick={handleClick}>Enter</button>
        </div>
    );
}
