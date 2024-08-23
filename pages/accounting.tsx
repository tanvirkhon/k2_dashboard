import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { fetchRecentTrades, fetchTradingStats, Trade } from '../api/mockApi'
import TradeTable from '../components/TradeTable'
import AIChat from '../components/AIChat'
import StatCard from '../components/StatCard'

export default function Accounting() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [stats, setStats] = useState<{
    totalProfit: number;
    winRate: number;
    totalTrades: number;
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const tradesPerPage = 20

  useEffect(() => {
    async function loadData() {
      const [tradesData, statsData] = await Promise.all([
        fetchRecentTrades(tradesPerPage, currentPage),
        fetchTradingStats()
      ])
      setTrades(tradesData.trades)
      setTotalPages(Math.ceil(tradesData.total / tradesPerPage))
      setStats(statsData)
    }
    loadData()
  }, [currentPage])

  return (
    <Layout>
      <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-8 text-center">Accounting</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard
              title="Total Profit"
              value={`$${stats?.totalProfit.toFixed(2) ?? '0.00'}`}
              change={stats?.totalProfit > 0 ? '+' : '-'}
              info="Total profit from all trades"
            />
            <StatCard
              title="Win Rate"
              value={`${stats?.winRate.toFixed(2) ?? '0'}%`}
              change={stats?.winRate > 50 ? '+' : '-'}
              info="Percentage of profitable trades"
            />
            <StatCard
              title="Total Trades"
              value={stats?.totalTrades ?? 0}
              change="="
              info="Number of trades executed"
            />
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Recent Trades</h2>
            <TradeTable trades={trades} />
            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
              <AIChat />
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm font-medium transition duration-300 w-full">
                Generate Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}