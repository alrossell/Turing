import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { computerAllSteps, listAllSteps } from './logic/Turing.js';
import FinitDisplay from './components/FiniteDisplay';
import InfiniteDisplay from './components/InfiniteDisplay';

import './Display.css';

function Display(props) {
    const [allRules, setAllRules] = props.rules;
    const [acceptedState, setAcceptedState] = props.state;
    const [currentDisplay, setCurrentDisplay] = useState('none');

    useEffect(() => {
        const storage = window.localStorage.getItem('currentDisplay');
        if (storage !== '[]') {
            setCurrentDisplay(JSON.parse(storage));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(
            'currentDisplay',
            JSON.stringify(currentDisplay)
        );
    }, [currentDisplay]);

    function computerTuringMachine() {
        const numberOfSteps = computerAllSteps(allRules, acceptedState);
        if (numberOfSteps === -1) {
        } else {
            setCurrentDisplay('finite');
        }
    }

    function differentDisplay() {
        if (currentDisplay === 'finite') {
            return (
                <FinitDisplay
                    rules={[allRules, setAllRules]}
                    state={[acceptedState, setAcceptedState]}
                />
            );
        } else if (currentDisplay === 'infinit') {
            return (
                <InfinitDisplay
                    rules={[allRules, setAllRules]}
                    state={[acceptedState, setAcceptedState]}
                />
            );
        }
        return (
            <div className="display-button-container">
                <button
                    className="display-button"
                    onClick={computerTuringMachine}
                >
                    Start the Turing Machine
                </button>
            </div>
        );
    }

    return <div className="display">{differentDisplay()}</div>;
}

export default Display;
