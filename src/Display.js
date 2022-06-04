import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { computerAllSteps, listAllSteps } from './logic/Turing.js';
import FiniteDisplay from './components/FiniteDisplay';
import InfiniteDisplay from './components/InfiniteDisplay';

import './Display.css';

function Display(props) {
    const [allRules, setAllRules] = props.rules;
    const [acceptedState, setAcceptedState] = props.state;
    const [currentDisplay, setCurrentDisplay] = useState();

    function computerTuringMachine() {
        let currentDisplayMode;
        const storage = window.localStorage.getItem('setCurrentDisplayMode');
        if (storage !== null) {
            currentDisplayMode = JSON.parse(
                window.localStorage.getItem('setCurrentDisplayMode')
            );
        } else {
            if (computerAllSteps(allRules, acceptedState) === -1) {
                currentDisplayMode = 'infinite';
            } else {
                currentDisplayMode = 'finite';
            }
            window.localStorage.setItem(
                'setCurrentDisplayMode',
                JSON.stringify(currentDisplayMode)
            );
        }

        if (currentDisplayMode === 'finite') {
            setCurrentDisplay(
                <FiniteDisplay
                    rules={[allRules, setAllRules]}
                    state={[acceptedState, setAcceptedState]}
                />
            );
        } else {
            setCurrentDisplay(
                <InfiniteDisplay
                    rules={[allRules, setAllRules]}
                    state={[acceptedState, setAcceptedState]}
                />
            );
        }
    }

    function differentDisplay() {
        if (currentDisplay === undefined) {
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
        } else {
            return currentDisplay;
        }
    }

    return differentDisplay();
}

export default Display;
