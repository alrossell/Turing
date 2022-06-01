import React, { useState } from 'react';

import './RulesForm.css';

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
            return <h3>Is a Valid Rule</h3>;
        } else {
            return <h3>Is NOT a Valid Rule</h3>;
        }
    }

    function displayAllRules() {
        if (allRules.length === 0) {
            return <h4>Please enter a valid rule</h4>;
        } else {
            const listRules = allRules.map((rule, index) => (
                <li key={index}>{`${index + 1} : ${rule}`}</li>
            ));
            return <ul className="all-rules">{listRules}</ul>;
        }
    }

    return (
        <div className="rules-form">
            <h2>Submit All Rules One at a Time</h2>
            <form onSubmit={handleRuleSubmit}>
                <input
                    className="bttn-container"
                    type="submit"
                    value="Submit"
                />
                <label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleRuleChange}
                    />
                </label>
            </form>
            {displayValidRule()}
            {displayAllRules()}
        </div>
    );
}

export default RulesForm;
