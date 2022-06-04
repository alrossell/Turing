import React from 'react';

import './DisplayTape.css';

function DisplayTape(props) {
    const tapes = props.tapes;
    const indexes = props.indexes;
    const index = props.index;
    const rules = props.rules;

    function testing(symbolIndex) {
        if (symbolIndex === indexes[index]) {
            return 'display-current-index';
        } else if (symbolIndex === indexes[index + 1]) {
            return 'display-next-index';
        } else {
            return 'display-index';
        }
    }
    function test() {
        console.log(tapes[index].map((symbol, symbolIndex) => symbol));
        return (
            <ul className="header-tape">
                {tapes[index].map((symbol, symbolIndex) => (
                    <li key={symbolIndex} className={testing(symbolIndex)}>
                        {symbol}
                    </li>
                ))}
            </ul>
        );
    }

    if (tapes !== null && tapes.length !== 0) {
        return (
            <div className="displayer-header-container">
                {index === indexes.length - 1 ? (
                    <h6>Return Tape:</h6>
                ) : (
                    <h6>Current Tape:</h6>
                )}

                {test()}
                <h6>Current Rule:</h6>
                {rules[index]}
            </div>
        );
    }
}

export default DisplayTape;
