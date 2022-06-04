import React, { useState, useEffect } from 'react';
import { computerAllSteps, listAllSteps } from '../logic/Turing.js';
import { useNavigate } from 'react-router-dom';

import DisplayTape from './DisplayTape.js';
import ImageSlider from './ImageSlider.js';
import RulesDisplay from './RulesDisplay.js';

import './FiniteDisplay.css';

function finitDisplay(props) {
    const navigate = useNavigate();

    const [allRules, setAllRules] = props.rules;
    const [acceptedState, setAcceptedState] = props.state;
    const [index, setIndex] = useState(0);

    const [tapes, setTapes] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [rules, setRules] = useState([]);

    useEffect(() => {
        if (acceptedState !== '') {
            const steps = listAllSteps(allRules, acceptedState);
            setTapes(steps.tapes);
            setIndexes(steps.indexes);
            setRules(steps.rules);

            window.localStorage.setItem('tapes', JSON.stringify(steps.tapes));
            window.localStorage.setItem('rules', JSON.stringify(steps.rules));
            window.localStorage.setItem(
                'indexes',
                JSON.stringify(steps.indexes)
            );
        } else {
            setTapes(JSON.parse(window.localStorage.getItem('tapes')));
            setIndexes(JSON.parse(window.localStorage.getItem('indexes')));
            setRules(JSON.parse(window.localStorage.getItem('rules')));

            setIndex(Number(JSON.parse(window.localStorage.getItem('index'))));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('index', JSON.stringify(index));
    }, [index]);

    function nextStep() {
        if (index < indexes.length - 1) {
            setIndex(index + 1);
        } else {
            alert('No index out of bounds');
        }
    }

    function previousStep() {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            alert('No index out of bounds');
        }
    }

    function finishState() {
        setIndex(indexes.length - 1);
    }

    function fullReset() {
        setAcceptedState([]);
        setAllRules([]);
        window.localStorage.clear();
        navigate('/');
    }

    function partialReset() {
        navigate('/');
    }

    return (
        <div className="finite-display-container">
            <div className="finite-display-header">
                <button className="bttn-container" onClick={partialReset}>
                    Edit Turing Machine
                </button>
                <button className="bttn-container" onClick={fullReset}>
                    Reset Turing Machine
                </button>
            </div>
            <div className="finite-display-body">
                <DisplayTape
                    tapes={tapes}
                    indexes={indexes}
                    index={index}
                    rules={rules}
                />
                <ImageSlider
                    tapes={tapes}
                    rules={rules}
                    indexes={indexes}
                    index={index}
                />
                <RulesDisplay rules={rules} index={index} />
            </div>

            <div className="finite-diplay-button-container">
                <button className="bttn-container" onClick={previousStep}>
                    Prev
                </button>
                <button className="bttn-container" onClick={nextStep}>
                    Next
                </button>
                <button className="bttn-container" onClick={finishState}>
                    Finish
                </button>
            </div>
        </div>
    );
}

export default finitDisplay;
