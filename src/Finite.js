import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DisplayTape from './components/DisplayTape.js';
import ImageSlider from './components/ImageSlider.js';
import RulesDisplay from './components/RulesDisplay.js';
import DisplayButtons from './components/DisplayButtons.js';

import getData from "./utils/getData.js"

import './css/FiniteDisplay.css';

function finitDisplay(props) {
    const navigate = useNavigate();

    const [tapes, setTapes] = useState(getData("tapes"));
    const [indexes, setIndexes] = useState(getData("indexes"));
    const [rules, setRules] = useState(getData("rules"));
    
    const mainIndexOpt = Number(getData("mainIndex"));

    const [mainIndex, setMainIndex] = useState(
        mainIndexOpt === null ? 0 : mainIndexOpt
    )

    useEffect(() => {
        window.localStorage.setItem('mainIndex', JSON.stringify(mainIndex));
    }, [mainIndex]);

    function fullReset() {
        window.sessionStorage.clear();
        navigate('/');
    }

    function partialReset() {
        navigate('/');
    }

    function getFiniteDisplay() {
        
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
                    mainIndex={mainIndex}
                    rules={rules}
                />

                <ImageSlider
                    tapes={tapes}
                    rules={rules}
                    indexes={indexes}
                    mainIndex={mainIndex}
                />
                <RulesDisplay rules={rules} mainIndex={mainIndex} /> 
            </div>

                <DisplayButtons 
                    mainIndex={[mainIndex, setMainIndex]} 
                    maxIndex={indexes.length - 1} 
                />
            </div>
        )
    }

    return getFiniteDisplay();
}

export default finitDisplay;
