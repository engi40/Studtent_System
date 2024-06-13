import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Styles file for appearance
let book_count =0;
let service1_count =0;
let service2_count =0;
let service3_count =0;
let pay_count=0;
let pay1_count=0;
let pay2_count=0;
let pay3_count=0;
function Tables() {
    const [highlightedBox, setHighlightedBox] = useState(null);

    const handleMouseEnter = (box) => {
        setHighlightedBox(box);
    };

    const handleMouseLeave = () => {
        setHighlightedBox(null);
    };

    const renderLinks = () => {
        return (
            <div className="container">
                <div class="background-slideshow"></div>

                <div
                    className={`box ${highlightedBox === 2 ? 'highlighted' : ''}`}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link style={{ color: '#000' }} to="/otherTable"> مستندات أخرى  </Link>
                </div>

                <div
                    className={`box ${highlightedBox === 1 ? 'highlighted' : ''}`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link style={{ color: '#000' }} to="/moneyTable"> المديونيات</Link>
                </div>

                <div
                    className={`box ${highlightedBox === 1 ? 'highlighted' : ''}`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link style={{ color: '#000' }} to="/List">  المصروفات</Link>
                </div>

                <div
                    className={`box ${highlightedBox === 1 ? 'highlighted' : ''}`}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link style={{ color: '#000' }} to="/info"> بيانات الطلاب </Link>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderLinks()}
        </div>
    );
}

export default Tables;
