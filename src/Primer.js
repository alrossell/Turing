import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import RulesForm from './components/RulesForm';
import StateForm from './components/StateForm';

import './Primer.css';

function State(props) {
    const navigate = useNavigate();

    function displayIsValid() {
        let buttonFunction = () => {};
        if (allRules.length === 0 || acceptedState === '') {
            alert('Both a valid rule and a valid state must be submitted!');
        } else {
            window.localStorage.clear();
            navigate('/display');
        }
    }

    const [allRules, setAllRules] = props.rules;
    const [acceptedState, setAcceptedState] = props.state;

    function setDefaultValues() {
        setAllRules([
            ['Scan', '0', '0', 'R', 'Scan'],
            ['Scan', '1', '1', 'R', 'Scan'],
            ['Scan', '#', '0', 'R', 'Adding'],
            ['Adding', '#', '0', 'R', 'Halt'],
        ]);
        setAcceptedState('1010');
    }

    return (
        <div className="primer-container">
            <h1 id="primer-title">The Turing Machine</h1>

            <div className="form-container">
                <RulesForm rules={props.rules} />
                <StateForm state={props.state} />
            </div>

            <div className="primer-button-container">
                <button className="primer-button" onClick={displayIsValid}>
                    Commence the Turing Machine
                </button>
                <button className="primer-button" onClick={setDefaultValues}>
                    Set to default Values
                </button>
            </div>
        </div>
    );
}

export default State;
