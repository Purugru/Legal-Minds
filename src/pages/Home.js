import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const sentences = [
    "Empowering Legal Insights",
    "Streamlining Case Management",
    "Innovating Legal Solutions",
    "Connecting Legal Minds"
];

const TypingAnimation = () => {
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [characterIndex, setCharacterIndex] = useState(0);

    useEffect(() => {
        if (characterIndex < sentences[currentSentenceIndex].length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + sentences[currentSentenceIndex][characterIndex]);
                setCharacterIndex((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedText("");
                setCharacterIndex(0);
                setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [characterIndex, currentSentenceIndex]);

    return (
        <h2 className="typing-space">{displayedText || "\u00A0"}</h2> // Keeps consistent space
    );
};

const Home = () => {
    return (
        <div className="home-container">
            <div className="column column1">
                <h1>Legal Minds</h1>
                <TypingAnimation />
                <p>Legal Minds is your go-to platform for all things legal. Whether you need case management tools, 
                   insightful articles, or a community of legal professionals, we bring it all together.</p>
                <div className="buttons">
                <button style={{ height: '50px', width: '150px', backgroundColor: '#007bff', color: '#fff' }}>
                    <Link to="/new" style={{ color: '#fff', textDecoration: 'none' }}>Get Started</Link>
                </button>
                <button style={{ height: '50px', width: '150px', backgroundColor: '#6c757d', color: '#fff' }}>
                    <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</Link>
                </button>
                </div>
            </div>
            <div className="column column2">
                <picture className="image-container">
                    <source srcSet="./home-illustration.webp" media="(min-width: 600px)" />
                    <img
                        className="image"
                        alt="Illustration of person reading a book"
                        src="./home-illustration-small.webp"
                        width="550"
                        height="466"
                    />
                </picture>
            </div>
        </div>
    );
};

export default Home;
