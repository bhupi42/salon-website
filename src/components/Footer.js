import React from 'react';
import './Footer.css';

const Footer = () => {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Luxe Beauty</h3>
                        <p>
                            We are committed to providing exceptional beauty services with a touch of luxury. 
                            Our experienced team is dedicated to making you look and feel your best.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                            <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
                            <li><a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>Gallery</a></li>
                            <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Opening Hours</h3>
                        <ul>
                            <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                            <li>Saturday: 9:00 AM - 6:00 PM</li>
                            <li>Sunday: 10:00 AM - 4:00 PM</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Luxe Beauty Salon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
