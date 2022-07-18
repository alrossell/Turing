import React, { useEffect, useState, useRef } from 'react';

import '../css/ImageSlider.css';

function ImageSlider(props) {
    const tapes = props.tapes;
    const indexes = props.indexes;
    const mainIndex = props.mainIndex;

    const bufferLength = 8;
    const slideWidth = 170;

    const [sliderTape, setSliderTape] = useState(makeSliderTapes());
    const [previousIndex, setPreviousIndex] = useState(null);

    const slider = useRef(null);

    function debounce(funct, ms) {
        let timer
        
        return () => {
          clearTimeout(timer)
          timer = setTimeout(_ => {
            timer = null
            funct.apply(this, arguments)
          }, ms)
        };
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            slider.current.style.transition = 'transform 0.6s ease-in-out';
            slider.current.style.transform = 'translateX(' + makeSlideTo() + 'px)';
        }, 100)
    
        window.addEventListener('resize', debouncedHandleResize)
    
        return () => {
          window.removeEventListener('resize', debouncedHandleResize)
        
        }
    })

    function makeSliderTapes() {
        return ([ ...Array(bufferLength).fill('#'),
                  ...tapes[mainIndex],
                  ...Array(bufferLength).fill('#'),
                ]);
    }

    function makeSlideTo() {
        return ( 
            -(
                bufferLength * slideWidth +
                slideWidth/2 +
                indexes[mainIndex] * slideWidth -
                (window.innerWidth) / 2
            )
        );
    }

    useEffect(() => {
        setSliderTape(makeSliderTapes())

        if(previousIndex !== null) {
            const oldSlide = document.getElementById(
                `slide-${previousIndex + bufferLength}`
            )

            // Unhighlighting old slide
            if (oldSlide) {
                oldSlide.style.borderColor = '#000000';
                oldSlide.style.transition = 'transform 0.4s';
                oldSlide.style.transform = 'scale(1, 1)';
            }
        }

        setPreviousIndex(indexes[mainIndex]);

        slider.current.style.transition = 'transform 0.4s ease-in-out';
        slider.current.style.transform = 'translateX(' + makeSlideTo() + 'px)';

        const newSlide = document.getElementById(
            `slide-${indexes[mainIndex] + bufferLength}`
        );
        
        // Highlighting new slide
        if (newSlide) {
            newSlide.style.borderColor = '#b82601';
            newSlide.style.transition = 'transform 0.4s';
            newSlide.style.transform = 'scale(1.2, 1.2)';
        }
    }, [mainIndex]);

    //Display
    function dipslaySliderTape() {
        return sliderTape.map((symbol, symbolIndex) => (
            <li className="slide-container" key={symbolIndex}>
                <div className="slide" id={'slide-' + symbolIndex}>
                    {symbol}
                </div>
            </li>
        ));
    }

    return (
        <div className="slider-container">
            <ol ref={slider} className="slider">{dipslaySliderTape()}</ol>
        </div>
    );
}

export default ImageSlider;
