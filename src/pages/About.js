import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [showGoals, setShowGoals] = useState(false);
    const [showParagraph, setShowParagraph] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowGoals(true), 1000);
        const timer2 = setTimeout(() => setShowParagraph(true), 2000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="about-container">
            {/* Section 1 and 2 in parallel columns */}
            <div className="main-content">
                <div className="column1">
                    <h1>Legal Minds</h1>
                    {showGoals && <h2 className="fade-in">Our Goals</h2>}
                    {showParagraph && (
                        <p className="fade-in-paragraph">
                            At Legal Minds, we aim to revolutionize the way the legal industry operates by providing top-tier case management solutions, cutting-edge legal tools, and a strong, supportive network for professionals across the globe. Our goal is to make legal services more efficient, accessible, and impactful for all stakeholders in the legal ecosystem.
                        </p>
                    )}
                </div>

                <div className="column2">
                    <picture className="image-container">
                        <img
                            className="image"
                            alt="Casual life illustration"
                            src="./casual-life-3d-meditation-crystal.webp"
                            width="500"
                            height="400"
                        />
                    </picture>
                </div>
            </div>

            {/* Section 3: Social Handles Centered Below */}
            <div className="social-handles">
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
    );
};

export default About;
