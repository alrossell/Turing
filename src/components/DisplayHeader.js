import React from 'react';

import './DisplayHeader.css';

function DisplayHeader(props) {
    const tapes = props.tapes;
    const indexes = props.indexes;
    const index = props.index;
    const rules = props.rules;

    if (tapes !== null && tapes.length !== 0) {
        return (
            <div className="displayer-header-container">
                <div>
                    {tapes[index].slice(0, indexes[index])}
                    <span className="display-current-index">
                        {tapes[index].slice(indexes[index], indexes[index] + 1)}
                    </span>
                    {tapes[index].slice(indexes[index] + 1)}
                </div>

                {rules[index]}
            </div>
        );
    }
}

export default DisplayHeader;
