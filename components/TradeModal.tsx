import React from 'react'
import { Trade } from '../api/mockApi'

type TradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trade: Trade | null;
}

export default function TradeModal({ isOpen, onClose, trade }: TradeModalProps) {
  if (!isOpen || !trade) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Trade Details</h2>
        <div className="mb-4">
          <p><strong>ID:</strong> {trade.id}</p>
          <p><strong>Pair:</strong> {trade.pair}</p>
          <p><strong>Type:</strong> {trade.type}</p>
          <p><strong>Amount:</strong> {trade.amount}</p>
          <p><strong>Price:</strong> ${trade.price.toFixed(2)}</p>
          <p><strong>Timestamp:</strong> {new Date(trade.timestamp).toLocaleString()}</p>
          <p className={`font-bold ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <strong>Profit:</strong> ${trade.profit.toFixed(2)}
          </p>
        </div>
        {/* Dropdown Example */}
        <select className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200">
          <option className="bg-gray-800 hover:bg-gray-700">Market Condition</option>
          <option className="bg-gray-800 hover:bg-gray-700">Bullish</option>
          <option className="bg-gray-800 hover:bg-gray-700">Bearish</option>
        </select>

        {/* Text Area Example */}
        <textarea className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white resize-none hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 mt-4" rows={4} placeholder="Add notes here..."></textarea>

        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}