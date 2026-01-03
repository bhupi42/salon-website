import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-wrapper">
                    <div className="logo">
                        <i className="fas fa-spa"></i>
                        <span>Luxe Beauty</span>
                    </div>
                    <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
                        <li><a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, '#services')}>Services</a></li>
                        <li><a href="#gallery" className="nav-link" onClick={(e) => handleNavClick(e, '#gallery')}>Gallery</a></li>
                        <li><a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                    </ul>
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
