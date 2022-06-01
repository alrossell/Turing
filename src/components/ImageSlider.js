import React, { useEffect, useState } from 'react';

import './ImageSlider.css';

function ImageSlider(props) {
    const tapes = props.tapes;
    const indexes = props.indexes;
    const index = props.index;
    const rules = props.rules;

    const bufferLength = 8;
    const slideWidth = 170;

    const [sliderTape, setSliderTape] = useState();

    const slider = document.querySelector('.slider');

    useEffect(() => {
        if (tapes !== undefined && tapes.length !== 0) {
            setSliderTape([
                ...Array(bufferLength).fill('#'),
                ...tapes[index],
                ...Array(bufferLength).fill('#'),
            ]);
        }
    }, [tapes]);

    useEffect(() => {
        if (tapes !== undefined && tapes.length !== 0) {
            slider.style.transition = 'transform 0.4s ease-in-out';
            slider.style.transform = 'translateX(' + index * slideWidth + 'px)';
            console.log(index);
            for (const x of sliderTape.keys()) {
                if (x === index) {
                    console.log(slider);
                    console.log(slider.childNodes[x]);
                    slider.childNodes[x].focus();
                }
            }
        }
    }, [index]);

    function dipslaySliderTape() {
        if (sliderTape !== undefined && sliderTape.length !== 0) {
            return sliderTape.map((symbol, symbolIndex) => (
                <li className="slide-container" key={symbolIndex}>
                    <div className="slide">{symbol}</div>
                </li>
            ));
        }
    }

    return (
        <div className="slider-container">
            <ol className="slider">{dipslaySliderTape()}</ol>
        </div>
    );
}

export default ImageSlider;
