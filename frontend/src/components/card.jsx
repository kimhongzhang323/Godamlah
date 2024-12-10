import React, { useState } from 'react';
import '../Card.css'; // Updated styles

// Import photos
import windowsPhoto from 'C:/Users/kimho/OneDrive/Documents/GitHub/Godamlah/frontend/asset/Laptop.jpeg';
import androidPhoto from 'C:/Users/kimho/OneDrive/Documents/GitHub/Godamlah/frontend/asset/Tablet.jpg';
import iosPhoto from 'C:/Users/kimho/OneDrive/Documents/GitHub/Godamlah/frontend/asset/Smartphone.jpg';

const photos = {
    windows: windowsPhoto,
    android: androidPhoto,
    ios: iosPhoto,
};

const Card = ({ device }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => setIsFlipped(!isFlipped);

    return (
        <div className="perspective" onClick={handleFlip}>
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-front">
                    <img
                        src={photos[device.type.toLowerCase()]}
                        alt={device.name}
                        className="w-full h-48 object-contain"
                    />
                    <h2>{device.name}</h2>
                </div>
                <div className="card-back">
                    <h2>Device Details</h2>
                    <p>Type: {device.type}</p>
                    <p>Status: {device.status}</p>
                    <p>Last Active: {device.lastActive}</p>
                    <p>More information about the device can go here.</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
