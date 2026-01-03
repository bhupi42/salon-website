import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const Gallery = () => {
    const galleryRef = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryData = [
        {
            src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500',
            title: 'Hair Styling',
            description: 'Professional cuts & colors'
        },
        {
            src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
            title: 'Spa Treatment',
            description: 'Relaxation & rejuvenation'
        },
        {
            src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500',
            title: 'Nail Care',
            description: 'Artistic designs & care'
        },
        {
            src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500',
            title: 'Facial Treatment',
            description: 'Glowing skin solutions'
        },
        {
            src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500',
            title: 'Makeup Artistry',
            description: 'Flawless beauty looks'
        },
        {
            src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500',
            title: 'Hair Treatments',
            description: 'Restore & revitalize'
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

        galleryRef.current.forEach((item, index) => {
            if (item) {
                item.style.opacity = '0';
                item.style.animationDelay = `${index * 0.1}s`;
                observer.observe(item);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <section id="gallery" className="gallery">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Gallery</h2>
                        <p className="section-subtitle">Witness the art of transformation</p>
                    </div>
                    <div className="gallery-grid">
                        {galleryData.map((item, index) => (
                            <div
                                key={index}
                                className="gallery-item"
                                ref={el => galleryRef.current[index] = el}
                                onClick={() => handleImageClick(item)}
                            >
                                <img src={item.src} alt={item.title} />
                                <div className="gallery-overlay">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedImage && (
                <div className="gallery-modal" onClick={closeModal}>
                    <img src={selectedImage.src} alt={selectedImage.title} />
                </div>
            )}
        </>
    );
};

export default Gallery;
