import React from 'react';

import '../css/DisplayTape.css';

function DisplayTape(props) {
    const tapes = props.tapes;
    const indexes = props.indexes;
    const mainIndex = props.mainIndex;
    const rules = props.rules;

    function labelTape(symbolIndex) {
        if (symbolIndex === indexes[mainIndex]) {
            return 'display-current-index';
        } else if (symbolIndex === indexes[mainIndex + 1]) {
            return 'display-next-index';
        } else {
            return 'display-index';
        }
    }

    function makeTape() {
        return (
            <ul className="header-tape">
                {tapes[mainIndex].map((symbol, symbolIndex) => (
                    <li key={symbolIndex} className={labelTape(symbolIndex)}>
                        {symbol}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="displayer-header-container">
            {mainIndex === indexes.length - 1 ? (
                <h6 id="return-tape">Return Tape:</h6>
            ) : (
                <h6>Current Tape:</h6>
            )}

            {makeTape()}
            <h6>Current Rule:</h6>
            {rules[mainIndex]}
        </div>
    );
}

export default DisplayTape;
