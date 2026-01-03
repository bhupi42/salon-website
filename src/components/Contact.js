import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
    const infoCardsRef = useRef([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        infoCardsRef.current.forEach((card, index) => {
            if (card) {
                card.style.opacity = '0';
                card.style.animationDelay = `${index * 0.15}s`;
                observer.observe(card);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const getServiceName = (serviceValue) => {
        const services = {
            'hair-styling': 'Hair Styling',
            'spa': 'Spa Treatment',
            'nails': 'Manicure & Pedicure',
            'facial': 'Facial Treatment',
            'makeup': 'Makeup Services',
            'treatment': 'Hair Treatment'
        };
        return services[serviceValue] || 'selected';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        
        setTimeout(() => {
            setShowSuccess(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            });
        }, 5000);
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Book your appointment today</p>
                </div>
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="info-card" ref={el => infoCardsRef.current[0] = el}>
                            <div className="info-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info-content">
                                <h3>Visit Us</h3>
                                <p>123 Beauty Avenue<br />Downtown Plaza, Suite 200<br />New York, NY 10001</p>
                            </div>
                        </div>
                        <div className="info-card" ref={el => infoCardsRef.current[1] = el}>
                            <div className="info-icon">
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="info-content">
                                <h3>Call Us</h3>
                                <p>Phone: (555) 123-4567<br />Mobile: (555) 987-6543<br />Mon-Sat: 9AM - 8PM</p>
                            </div>
                        </div>
                        <div className="info-card" ref={el => infoCardsRef.current[2] = el}>
                            <div className="info-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info-content">
                                <h3>Email Us</h3>
                                <p>info@luxebeauty.com<br />appointments@luxebeauty.com<br />We reply within 24 hours</p>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                />
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your Phone"
                                    required
                                />
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className="form-group">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Service</option>
                                    <option value="hair-styling">Hair Styling</option>
                                    <option value="spa">Spa Treatment</option>
                                    <option value="nails">Manicure & Pedicure</option>
                                    <option value="facial">Facial Treatment</option>
                                    <option value="makeup">Makeup Services</option>
                                    <option value="treatment">Hair Treatment</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Additional Notes"
                                ></textarea>
                                <i className="fas fa-comment"></i>
                            </div>
                            <button type="submit" className="submit-button">Book Appointment</button>
                        </form>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <h3>Appointment Request Received!</h3>
                    <p>Thank you, {formData.name}! We'll contact you shortly at {formData.email} to confirm your {getServiceName(formData.service)} appointment.</p>
                </div>
            )}
        </section>
    );
};

export default Contact;
