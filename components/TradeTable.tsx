import React from 'react';
import { Trade } from '../api/mockApi';

type TradeTableProps = {
  trades: Trade[];
};

export default function TradeTable({ trades }: TradeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Pair</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Profit</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b border-gray-700">
              <td className="px-4 py-2">{trade.id}</td>
              <td className="px-4 py-2">{trade.pair}</td>
              <td className="px-4 py-2">{trade.type}</td>
              <td className="px-4 py-2">{trade.amount}</td>
              <td className="px-4 py-2">${trade.price.toFixed(2)}</td>
              <td className="px-4 py-2">{new Date(trade.timestamp).toLocaleString()}</td>
              <td className={`px-4 py-2 ${trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${trade.profit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}