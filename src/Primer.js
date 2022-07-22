import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RulesForm from './components/RulesForm';
import StateForm from './components/StateForm';

import randomTuring from "./utils/randomTuring"
import getData from './utils/getData';
import  storeData  from "./utils/storeData"

import './css/Primer.css';

function State(props) {
    const navigate = useNavigate();

    const allRulesOpt = getData("allRules");
    const [allRules, setAllRules] = useState(
        allRulesOpt === null ? [] : allRulesOpt
    )

    const acceptedStateOpt = getData("acceptedState");
    const [acceptedState, setAcceptedState] = useState(
        acceptedStateOpt === null ? "" : acceptedStateOpt
    )

    function checkIsValid() {
        if (allRules.length === 0 || acceptedState === '') {
            alert('Both a valid rule and a valid state must be submitted!');
        } else {
            window.sessionStorage.clear();
            storeData([["allRules", allRules], ["acceptedState", acceptedState]])
            navigate('/display');
        }
    }

    function isValid() {
        return !(allRules.length === 0 || acceptedState === '')
    }
    
    function displayIsValid() {

        if (isValid()) {
            return <p 
                    className="valid-wrapper"
                    id="is-valid-display">
                        Is a Valid Turing Machine
                </p>;
        } else {
            return <p 
                    className = "valid-wrapper"
                    id="not-valid-display">
                        Not a Valid Turing Machine
                </p>;
        }
    }

    function setRandomMachine() {
        const [states, turing] = randomTuring()
        setAllRules(turing);
        setAcceptedState(states);
    }

    function clear() {
        setAllRules([]);
        setAcceptedState("");
    }

    return (
        <div className="primer-container">
            <h1 id="primer-title">The Turing Machine</h1>

            <div className="form-container">
                <RulesForm rules={[allRules, setAllRules]} />
                <StateForm state={[acceptedState, setAcceptedState]} />
            </div>

            {displayIsValid()}

            <div className="primer-button-container">
                
                <button 
                    className="primer-button" 
                    id = {(isValid()) ? "valid-button" : "nonvalid-button"}
                    onClick={checkIsValid}
                    >
                    Commence the Turing Machine
                </button>
                <button className="primer-button" onClick={setRandomMachine}>
                    Set to Random Machine
                </button>
                <button className="primer-button" onClick={clear}>
                    Clear the Turing Machine
                </button>
            </div>

            <div id="info-link-container">
                <a className="bttn-container-2" href="https://cs.lmu.edu/~ray/notes/turingmachines/">
                    What's a Turing Machine?
                </a>

            </div>
        </div>
    );
}

export default State;
