import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaSave } from 'react-icons/fa';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [tradingThreshold, setTradingThreshold] = useState('');

    const handleSave = () => {
        // Handle save logic here (e.g., API call to save settings)
        console.log('Settings saved:', { notificationsEnabled, apiKey, tradingThreshold });
    };

    return (
        <Layout>
            <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="space-y-6">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    id="notifications"
                                    checked={notificationsEnabled} 
                                    onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
                                    className="mr-2 h-5 w-5 text-blue-600"
                                />
                                <label htmlFor="notifications" className="text-lg text-gray-300">
                                    Enable Notifications
                                </label>
                            </div>
                            <div>
                                <label htmlFor="apiKey" className="block text-lg mb-2 text-gray-300">
                                    API Key
                                </label>
                                <input 
                                    type="text" 
                                    id="apiKey"
                                    value={apiKey} 
                                    onChange={(e) => setApiKey(e.target.value)} 
                                    placeholder="Enter API Key" 
                                    className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="tradingThreshold" className="block text-lg mb-2 text-gray-300">
                                    Trading Threshold
                                </label>
                                <input 
                                    type="number" 
                                    id="tradingThreshold"
                                    value={tradingThreshold} 
                                    onChange={(e) => setTradingThreshold(e.target.value)} 
                                    placeholder="Enter Trading Threshold" 
                                    className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={handleSave}
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-lg font-medium transition duration-300 flex items-center"
                                >
                                    <FaSave className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;