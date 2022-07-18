import React, { useState } from 'react';

import '../css/StateForm.css';

function StateForm(props) {
    const [newState, setNewState] = useState('');
    const [acceptedState, setAcceptedState] = props.state;
    const [validState, setValidState] = useState(false);

    function handleStateChange(event) {
        const currState = event.target.value;
        setNewState(currState);
        if (checkCurrentState(currState)) {
            setValidState(true);
        } else {
            setValidState(false);
        }
    }

    function checkCurrentState(state) {
        const regexp = /\b[10]+\b/;
        const newState = state.match(regexp);
        return newState !== null;
    }

    function handleStateSubmit(event) {
        if (validState) {
            setAcceptedState(newState);
        } else {
            alert('Is not a valid state!');
        }
        event.preventDefault();
    }

    function displayValidState() {
        if (validState) {
            return <h4>This New State is Valid</h4>;
        } else {
            return <h4>This New State is NOT Valid</h4>;
        }
    }

    function displayState() {
        if (acceptedState === '') {
            return <h4>Please enter a valid state</h4>;
        } else {
            return (
                <div id="display-state">
                    <h4 id="current-state">Current State:</h4>

                    <p>{acceptedState}</p>
                </div>
            );
        }
    }

    return (
        <div className="state-form">
            <h2>Submit Starting State</h2>

            <form onSubmit={handleStateSubmit}>
                <input
                    className="bttn-container"
                    type="submit"
                    value="Submit"
                />
                <label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleStateChange}
                    />
                </label>
            </form>
            {displayValidState()}
            {displayState()}
        </div>
    );
}

export default StateForm;
