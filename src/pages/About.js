import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [showGoals, setShowGoals] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);

    useEffect(() => {
        // Fade in Goals and Paragraph with some delay
        const timer1 = setTimeout(() => {
            setShowGoals(true);
        }, 1000); // 1 second after page load

        const timer2 = setTimeout(() => {
            setShowParagraph(true);
        }, 2000); // 2 seconds after page load

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="about-container">
            <div className="column column1">
                <h1>Legal Minds</h1>

                {/* Fading in the subheading "Our Goals" */}
                {showGoals && <h2 className="fade-in">Our Goals</h2>}

                {/* Fading in the paragraph */}
                {showParagraph && (
                    <p className="fade-in-paragraph">
                        At Legal Minds, we aim to revolutionize the way the legal industry operates by providing top-tier case management solutions, cutting-edge legal tools, and a strong, supportive network for professionals across the globe. Our goal is to make legal services more efficient, accessible, and impactful for all stakeholders in the legal ecosystem.
                    </p>
                )}
            </div>

            <div className="column column2">
                <picture className="image-container">
                    <img
                        className="image"
                        alt="Casual life illustration"
                        src="./casual-life-3d-meditation-crystal.webp"
                        width="500"
                        height="400"
                    />
                </picture>

                {/* Contact Us Buttons */}
                <div className="contact-us">
                    <a href="https://github.com" className="contact-btn github">
                        <img src="github-logo.png" alt="GitHub Logo" width="20" height="20" />
                        GitHub
                    </a>
                    <a href="https://www.instagram.com" className="contact-btn instagram">
                        <img src="instagram-logo.png" alt="Instagram Logo" width="20" height="20" />
                        Instagram
                    </a>
                    <a href="mailto:contact@legalminds.com" className="contact-btn x">
                        <img src="x-logo.png" alt="X Logo" width="20" height="20" />
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
