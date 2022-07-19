import React, { useState } from 'react';
import { computerAllSteps, listAllSteps } from './logic/Turing.js';

import { useNavigate } from 'react-router-dom';

import getData from './utils/getData.js';
import storeData from "./utils/storeData.js"

import './css/Display.css';

function Display(props) {
    const [allRules, setAllRules] = useState(getData("allRules"));
    const [acceptedState, setAcceptedState] = useState(getData("acceptedState"));

    const navigate = useNavigate();

    function computerTuringMachine() {
        if (computerAllSteps(allRules, acceptedState) === -1) {
            alert("Turing Machine too large")
            navigate('/');
            
        } else {
            navigate('/twoWayDisplay');
            const steps = listAllSteps(allRules, acceptedState);
            storeData([["rules", steps.rules], ["indexes", steps.indexes], ["tapes", steps.tapes]])
        }
    }

    function differentDisplay() {
        return (
            <div className="display">
                <div className="display-button-container">
                    <button
                        className="display-button"
                        onClick={computerTuringMachine}
                    >
                        Start the Turing Machine
                    </button>
                </div>
            </div>
        );
    }
    return differentDisplay();
}

export default Display;
