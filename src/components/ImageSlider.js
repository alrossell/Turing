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
    const [previousIndex, setPreviousIndex] = useState(-1);
    const [slideTo, setSlideTo] = useState();

    const slider = document.querySelector('.slider');

    const [test, setTest] = useState();

    useEffect(() => {
        if (tapes !== undefined && tapes.length !== 0) {
            setSliderTape([
                ...Array(bufferLength).fill('#'),
                ...tapes[index],
                ...Array(bufferLength).fill('#'),
            ]);

            const newSlideTo = -(
                bufferLength * slideWidth +
                slideWidth / 2 -
                window.outerWidth / 2
            );
            setSlideTo(newSlideTo);
            setPreviousIndex(index);
            slider.style.transition = 'transform 0.6s ease-in-out';
            slider.style.transform = 'translateX(' + newSlideTo + 'px)';
        }
    }, [tapes]);

    useEffect(() => {
        if (slider) {
            let newSlideTo = slideTo;
            if (previousIndex === -1) {
            } else if (previousIndex > index) {
                newSlideTo += slideWidth;
            } else {
                newSlideTo -= slideWidth;
            }
            setPreviousIndex(index);
            setSlideTo(newSlideTo);

            const oldSlide = document.getElementById(
                `slide-${previousIndex + bufferLength}`
            );

            if (oldSlide) {
                oldSlide.style.borderColor = '#000000';
                oldSlide.style.transition = 'transform 0.4s';
                oldSlide.style.transform = 'scale(1, 1)';
            }

            slider.style.transition = 'transform 0.4s ease-in-out';
            slider.style.transform = 'translateX(' + newSlideTo + 'px)';

            const newSlide = document.getElementById(
                `slide-${index + bufferLength}`
            );

            if (newSlide) {
                newSlide.style.borderColor = '#b82601';
                newSlide.style.transition = 'transform 0.4s';
                newSlide.style.transform = 'scale(1.2, 1.2)';
            }

            if (sliderTape) {
                setSliderTape([
                    ...Array(bufferLength).fill('#'),
                    ...tapes[index],
                    ...Array(bufferLength).fill('#'),
                ]);
            }
        }
    }, [index]);

    // Set selects the first image
    useEffect(() => {
        const newSlide = document.getElementById(
            `slide-${index + bufferLength}`
        );

        if (newSlide) {
            newSlide.style.borderColor = '#b82601';
            newSlide.style.transition = 'transform 0.4s';
            newSlide.style.transform = 'scale(1.2, 1.2)';
        }
    }, [test]);

    function dipslaySliderTape() {
        if (sliderTape !== undefined && sliderTape.length !== 0) {
            if (test === undefined) {
                setTest(1);
            }
            return sliderTape.map((symbol, symbolIndex) => (
                <li className="slide-container" key={symbolIndex}>
                    <div className="slide" id={'slide-' + symbolIndex}>
                        {symbol}
                    </div>
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
