import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function About() {
    return (
        <>
            <Header />
            <header>hello from about</header>
        </>
    );
}

/*
function About() {
    const blackTextStyle = {
        color: 'black'
      };
    
    return (
        <div>
            <p style={blackTextStyle}> hi from home page </p>
            <Link to="/Home" style={blackTextStyle}> go to Home</Link>
        </div>
    );
}

export default About;

*/