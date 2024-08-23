import React from 'react'
import Layout from '../components/Layout'
import { FaBolt, FaRobot, FaPlusCircle } from 'react-icons/fa'

interface Bot {
  id: string;
  name: string;
  strategy: string;
  performance: string;
  winRate: string;
  tradesPerDay: number;
  avgProfitPerTrade: string;
  description: string;
}

const mockBots: Bot[] = [
  {
    id: 'bot1',
    name: 'Momentum Master',
    strategy: 'Trend Following',
    performance: '+15.3%',
    winRate: '68%',
    tradesPerDay: 5,
    avgProfitPerTrade: '$23.50',
    description: 'Utilizes momentum indicators to catch and ride strong market trends.',
  },
  {
    id: 'bot2',
    name: 'Scalper Supreme',
    strategy: 'High-Frequency',
    performance: '+8.7%',
    winRate: '72%',
    tradesPerDay: 50,
    avgProfitPerTrade: '$3.20',
    description: 'Executes rapid trades to capitalize on small price movements.',
  },
]

export default function BotManager() {
  return (
    <Layout>
      <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-8 text-center">TradingBot Manager</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {mockBots.map(bot => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaRobot className="mr-2" />
              AI Bot Creator
            </h2>
            <p className="mb-4 text-gray-300">Let AI design your next trading bot based on your requirements.</p>
            <div className="mb-4">
              <label htmlFor="botRequirements" className="block mb-2 text-gray-300">Describe your ideal trading bot:</label>
              <textarea 
                id="botRequirements" 
                rows={4} 
                className="w-full bg-gray-700 rounded px-3 py-2 text-white"
                placeholder="E.g., I want a bot that trades Bitcoin using a mean reversion strategy..."
              ></textarea>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300 flex items-center">
              <FaBolt className="mr-2" />
              Generate AI Trading Bot
            </button>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-lg font-semibold flex items-center mx-auto transition duration-300">
              <FaPlusCircle className="mr-2" />
              Create New Bot Manually
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function BotCard({ bot }: { bot: Bot }) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="bg-gray-800 m-2 rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-2xl font-bold text-center mb-2">{bot.name}</h3>
          <p className="text-gray-300 text-center">{bot.strategy}</p>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Stat label="Performance" value={bot.performance} />
            <Stat label="Win Rate" value={bot.winRate} />
            <Stat label="Trades/Day" value={bot.tradesPerDay.toString()} />
            <Stat label="Avg. Profit/Trade" value={bot.avgProfitPerTrade} />
          </div>
          <p className="text-gray-300 mb-4 text-center">{bot.description}</p>
          <div className="flex justify-center space-x-2">
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300">
              Start
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300">
              Edit
            </button>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center bg-gray-700 rounded-lg p-2">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}