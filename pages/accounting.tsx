import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { fetchRecentTrades, fetchTradingStats, Trade } from '../api/mockApi'
import TradeTable from '../components/TradeTable'
import AIChat from '../components/AIChat'

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
      <h1 className="text-3xl font-bold mb-6">Accounting</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard title="Total Profit" value={`$${stats?.totalProfit.toFixed(2) ?? '0.00'}`} />
        <StatCard title="Win Rate" value={`${stats?.winRate.toFixed(2) ?? '0'}%`} />
        <StatCard title="Total Trades" value={stats?.totalTrades ?? 0} />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Trades</h2>
        <TradeTable trades={trades} />
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>
          <AIChat />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full">
            Generate Detailed Report
          </button>
        </div>
      </div>
    </Layout>
  )
}

function StatCard({ title, value }: { title: string, value: string | number }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}