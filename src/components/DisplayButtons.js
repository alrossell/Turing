import React from 'react';

import "../css/DisplayButtons.css"

function DisplayButtons(props) {

    const [mainIndex, setMainIndex] = props.mainIndex;
    const maxIndex = props.maxIndex;

    function nextStep() {
        if (mainIndex < maxIndex) {
            setMainIndex(mainIndex + 1);
        } else {
            alert('No index out of bounds');
        }
    }

    function previousStep() {
        if (mainIndex > 0) {
            setMainIndex(mainIndex - 1);
        } else {
            alert('No index out of bounds');
        }
    }
    
    function finishState() {
        setMainIndex(maxIndex);
    }

    return (
        <div className="diplay-button-container">
            <button className="bttn-container" onClick={previousStep}>
                Prev
            </button>
            <button className="bttn-container" onClick={nextStep}>
                Next
            </button>
            <button className="bttn-container" onClick={finishState}>
                Finish
            </button>
        </div>
    )
}

export default DisplayButtons