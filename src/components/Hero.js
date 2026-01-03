import React from 'react';
import './Hero.css';

const Hero = () => {
    const handleBookingClick = (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">Welcome to Luxe Beauty Salon</h1>
                <p className="hero-subtitle">Experience Luxury, Embrace Beauty</p>
                <p className="hero-description">
                    Where elegance meets expertise. Discover our premium salon services tailored just for you.
                </p>
                <a href="#contact" className="cta-button" onClick={handleBookingClick}>
                    Book Appointment
                </a>
            </div>
            <div className="scroll-indicator">
                <i className="fas fa-chevron-down"></i>
            </div>
        </section>
    );
};

export default Hero;
