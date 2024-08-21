// pages/settings.tsx

import React, { useState } from 'react';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [tradingThreshold, setTradingThreshold] = useState('');

    const handleSave = () => {
        // Handle save logic here (e.g., API call to save settings)
        console.log('Settings saved:', { notificationsEnabled, apiKey, tradingThreshold });
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <div>
                <label>
                    <input 
                        type="checkbox" 
                        checked={notificationsEnabled} 
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                    />
                    Enable Notifications
                </label>
            </div>
            <div>
                <label>
                    API Key: 
                    <input 
                        type="text" 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)} 
                        placeholder="Enter API Key" 
                    />
                </label>
            </div>
            <div>
                <label>
                    Trading Threshold: 
                    <input 
                        type="number" 
                        value={tradingThreshold} 
                        onChange={(e) => setTradingThreshold(e.target.value)} 
                        placeholder="Enter Trading Threshold" 
                    />
                </label>
            </div>
            <div>
                <button onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
};

export default Settings;