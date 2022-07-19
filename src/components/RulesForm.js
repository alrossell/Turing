import React, { useState } from 'react';

import '../css/RulesForm.css';

function RulesForm(props) {
    const [allRules, setAllRules] = props.rules;
    const [newRule, setNewRule] = useState('');
    const [validRule, setValidRule] = useState(false);

    function handleRuleChange(event) {
        const currRule = event.target.value;
        setNewRule(currRule.split(','));
        if (checkCurrentRule(currRule)) {
            setValidRule(true);
        } else {
            setValidRule(false);
        }
    }

    function checkCurrentRule(rule) {
        const regexp = /\s*[^,]+,\s*[^,],\s*[^,],\s*[LR],\s*[^,]+\s*/;
        const newRule = rule.match(regexp);
        return newRule !== null;
    }

    function handleRuleSubmit(event) {
        if (validRule) {
            setAllRules([...allRules, newRule]);
        } else {
            alert('Is not valid rule!');
        }
        event.preventDefault();
    }

    function displayValidRule() {
        if (validRule) {
            return <h4>This New Rule is Valid</h4>;
        } else {
            return <h4>This New Rule is NOT Valid</h4>;
        }
    }

    function removeRule(index) {
        allRules.splice(index, 1);
        setAllRules([...allRules]);
    }

    function displayAllRules() {
        if (allRules.length === 0) {
            return <h4>Please enter a valid rule</h4>;
        } else {
            const listRules = allRules.map((rule, index) => (
                <li key={index}>
                    {`${index + 1} : ${rule}`}{' '}
                    <button
                        className="remove-button"
                        onClick={() => removeRule(index)}
                    >
                        X
                    </button>
                </li>
            ));
            return (
                <div id="valid-rules-container">
                    <h4 id="valid-rules">Current Valid Rules:</h4>
                    <ul className="all-rules">{listRules}</ul>
                </div>
            );
        }
    }

    return (
        <div className="rules-form-container">
            <h2>Submit All Rules One at a Time</h2>
            <form id="rules-form" onSubmit={handleRuleSubmit}>
                <input
                    className="bttn-container"
                    type="submit"
                    value="Submit"
                />
                <label>
                    <input
                        placeholder="enter your rule here"
                        type="text"
                        name="name"
                        onChange={handleRuleChange}
                    />
                </label>
                <div id="rules-info">
                    <spam>
                        ?
                    </spam>
                    <p id="rules-info-dropdown">
                        The valid inputs for rules follows the pattern of: <br/>
                        Initial State, <br/>
                        Initial Sybmol (0/1/#), <br/>
                        Replacement Sybmol (0/1/#), <br/>
                        Direction (L/R), <br/>
                        Next State <br/>
                        (Note: they must be seperate with a comma)
                    </p>
                </div>
                
            </form>
            {displayValidRule()}
            {displayAllRules()}
        </div>
    );
}

export default RulesForm;
