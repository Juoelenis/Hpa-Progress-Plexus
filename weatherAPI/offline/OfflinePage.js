import React, { useState, useEffect } from 'react';
import './OfflinePage.css';

const OfflinePage = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="offline-page">
            {isOnline ? (
                <p>You are online! Enjoy browsing.</p>
            ) : (
                <div className="offline-message">
                    <h2>No Internet Connection</h2>
                    <p>Please check your connection and try again.</p>
                    <button onClick={handleRefresh} className="refresh-button">Refresh</button>
                </div>
            )}
        </div>
    );
};

export default OfflinePage;
