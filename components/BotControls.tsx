import React, { useState } from 'react'

export default function BotControls() {
  const [tradingPair, setTradingPair] = useState('BTC/USD')
  const [tradeAmount, setTradeAmount] = useState('0.01')
  const [stopLoss, setStopLoss] = useState('2')
  const [takeProfit, setTakeProfit] = useState('5')
  const [isRunning, setIsRunning] = useState(false)

  const handleUpdateSettings = () => {
    // In a real application, this would update the bot's settings
    console.log('Updating settings:', { tradingPair, tradeAmount, stopLoss, takeProfit })
  }

  const handleToggleBot = () => {
    setIsRunning(!isRunning)
    // In a real application, this would start or stop the bot
    console.log(isRunning ? 'Stopping bot' : 'Starting bot')
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Bot Controls</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tradingPair">Trading Pair</label>
          <select 
            id="tradingPair" 
            className="w-full bg-gray-700 rounded px-3 py-2"
            value={tradingPair}
            onChange={(e) => setTradingPair(e.target.value)}
          >
            <option>BTC/USD</option>
            <option>ETH/USD</option>
            <option>XRP/USD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tradeAmount">Trade Amount</label>
          <input 
            type="number" 
            id="tradeAmount" 
            className="w-full bg-gray-700 rounded px-3 py-2" 
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="stopLoss">Stop Loss (%)</label>
          <input 
            type="number" 
            id="stopLoss" 
            className="w-full bg-gray-700 rounded px-3 py-2" 
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="takeProfit">Take Profit (%)</label>
          <input 
            type="number" 
            id="takeProfit" 
            className="w-full bg-gray-700 rounded px-3 py-2" 
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          onClick={handleUpdateSettings}
        >
          Update Settings
        </button>
        <button 
          className={`px-4 py-2 rounded ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          onClick={handleToggleBot}
        >
          {isRunning ? 'Stop Bot' : 'Start Bot'}
        </button>
      </div>
    </div>
  )
}