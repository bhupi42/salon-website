import React, { useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
    const servicesRef = useRef([]);

    const servicesData = [
        {
            icon: 'fa-cut',
            title: 'Hair Styling',
            description: 'Expert cuts, coloring, highlights, and styling for all hair types. Transform your look with our master stylists.',
            price: 'Starting from $45'
        },
        {
            icon: 'fa-spa',
            title: 'Spa Treatments',
            description: 'Relax and rejuvenate with our luxurious spa treatments, facials, and body massages.',
            price: 'Starting from $65'
        },
        {
            icon: 'fa-hand-sparkles',
            title: 'Manicure & Pedicure',
            description: 'Pamper your hands and feet with our professional nail care and artistic nail designs.',
            price: 'Starting from $35'
        },
        {
            icon: 'fa-face-grin-beam',
            title: 'Facial Treatments',
            description: 'Revitalize your skin with our customized facial treatments using premium products.',
            price: 'Starting from $55'
        },
        {
            icon: 'fa-paint-brush',
            title: 'Makeup Services',
            description: 'Professional makeup application for weddings, parties, and special occasions.',
            price: 'Starting from $75'
        },
        {
            icon: 'fa-leaf',
            title: 'Hair Treatments',
            description: 'Deep conditioning, keratin treatments, and hair restoration therapies for healthy, gorgeous hair.',
            price: 'Starting from $50'
        }
    ];

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

        servicesRef.current.forEach((card, index) => {
            if (card) {
                card.style.opacity = '0';
                card.style.animationDelay = `${index * 0.1}s`;
                observer.observe(card);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">Indulge in our premium beauty treatments</p>
                </div>
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            ref={el => servicesRef.current[index] = el}
                        >
                            <div className="service-icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <span className="service-price">{service.price}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
