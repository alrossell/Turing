import React from 'react';

import '../css/RulesDisplay.css';

function RulesDisplay(props) {
    const rules = props.rules;
    const mainIndex = props.mainIndex;

    if (rules !== null && rules.length !== 0) {
        return (
            <div className="rules-display-container">
                <ul className="display-rules">
                    {rules.map((rule, rulesIndex) =>
                        rulesIndex === mainIndex ? (
                            <li
                                className="display-rule"
                                key={rulesIndex}
                                style={{ color: 'red' }}
                            >
                                {rule}
                            </li>
                        ) : (
                            <li className="display-rule" key={rulesIndex}>
                                {rule}
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}

export default RulesDisplay;
