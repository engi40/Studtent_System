import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Styles file for appearance

function HomePage() {
    const [highlightedBoxo, setHighlightedBoxo] = useState(null);

    const handleMouseEnter = (boxo) => {
        setHighlightedBoxo(boxo);
    };

    const handleMouseLeave = () => {
        setHighlightedBoxo(null);
    };

    const backgrounds = ['../images/background.jpg', '../images/background1.jpg', '../images/background2.jpg', '../images/background3.jpg'];
    let index = 0;

    useEffect(() => {
        const backgroundElement = document.querySelector('.background-slideshow');

        const changeBackground = () => {
            backgroundElement.style.backgroundImage = `url('${backgrounds[index]}')`;
            index = (index + 1) % backgrounds.length;
        };

        const intervalId = setInterval(changeBackground, 10000); // Change every 10 seconds (10000 milliseconds)

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <div className="background-slideshow"></div>

            <div
                className={`boxo ${highlightedBoxo === 1 ? 'highlighted' : ''}`}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
            >
                <Link style={{color: '#000'}} to="/Tables"> عرض</Link>
            </div>
            <div
                className={`boxo ${highlightedBoxo === 2 ? 'highlighted' : ''}`}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
            >
                <Link style={{color: '#000'}} to="/add"> إضافة وافد جديد</Link>
            </div>
        </div>
    );
}

export default HomePage;
