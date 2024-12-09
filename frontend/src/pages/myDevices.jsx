import React from 'react';
import WordFadeIn from '../components/ui/word-fade-in.tsx';
import Card from '../components/Card';

const devices = [
    { id: 1, name: 'Laptop', type: 'Windows', status: 'Online', lastActive: '10 minutes ago' },
    { id: 2, name: 'Smartphone', type: 'Android', status: 'Offline', lastActive: '1 hour ago' },
    { id: 3, name: 'Tablet', type: 'iOS', status: 'Online', lastActive: '5 minutes ago' },
];

export default function MyDevices() {
    return (
        <div className="container mx-auto p-4">
            <WordFadeIn words="My Devices" className="text-3xl font-bold mb-4" />
            <div className="flex flex-wrap -mx-4">
                {devices.map(device => (
                    <div key={device.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <Card device={device} />
                    </div>
                ))}
            </div>
        </div>
    );
}