// Carousel.js
import React, { useState, useEffect } from 'react';
import carouselCSS from './carouselCSS';

const Carousel = ({ settings, children = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(4);
    const [showIndividualArrow, setShowIndividualArrow] = useState({
        leftArrow: false,
        rightArrow: children.length > itemsToShow,
    });

    //Destructing form settings props object
    const { showArrows, responsive } = settings;

    // Function to handle the next slide
    const nextSlide = () => {
        let endSlidesCount = (children.length - itemsToShow) - 1;
        if (currentIndex <= endSlidesCount) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setShowIndividualArrow(prev => ({ ...prev, leftArrow: true }));
        } else {
            setShowIndividualArrow(prev => ({ ...prev, rightArrow: false }));
        }
    };

    // Function to handle the previous slide
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1));
            setShowIndividualArrow(prev => ({ ...prev, rightArrow: true }));
        } else {
            setShowIndividualArrow(prev => ({ ...prev, leftArrow: false }));
        }
    };

    //Device check on initial load updated state
    useEffect(() => {
        console.log(responsive, "use")
        const updateItemsToShow = () => {
            const width = window.innerWidth;
            if (width < 767) {
                setItemsToShow(responsive.mobile);
            } else if (width >= 767 && width < 1024) {
                setItemsToShow(responsive.tablet);
            } else {
                setItemsToShow(responsive.desktop);
            }
        };
        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        return () => {
            window.removeEventListener('resize', updateItemsToShow);
        };
    }, [window.innerWidth]);


    return (
        <>
            <style>
                {carouselCSS}
            </style>
            <div className="carousel">
                <div
                    className="carousel-inner"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
                >
                    {children.map((childElement, index) => (
                        <div
                            key={index}
                            className="carousel-item"
                            style={{ minWidth: `${100 / itemsToShow}%` }}
                        >
                            {childElement}
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <>
                        <button
                            className={`carousel-control prev ${showIndividualArrow.leftArrow ? "enable" : ""}`}
                            onClick={prevSlide}
                            disabled={!showIndividualArrow.leftArrow} 
                        >
                            &#10094;
                        </button>
                        <button
                            className={`carousel-control next ${showIndividualArrow.rightArrow ? "enable" : ""}`}
                            onClick={nextSlide}
                            disabled={!showIndividualArrow.rightArrow}
                        >
                            &#10095;
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Carousel;
