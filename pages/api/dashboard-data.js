// pages/api/dashboard-data.js
export default function handler(req, res) {
  const fakeData = {
    performance: {
      revenue: "$10,500",
      change: "+5.2%",
      chartData: [100, 120, 115, 130, 140, 135, 150]
    },
    status: {
      MA_200: "143.32",
      Short_term_MA: "142.41",
      ATR: "0.18",
      RSI: "28.03",
      Leverage: "2",
      Entry_Price: "142.4",
      Current_Price: "142.33",
      Dynamic_TP: "141.93",
      Initial_SL: "143.59",
      Trailing_Stop: "142.47",
      USDT_Dom: "5.35%",
      Last_Trade: "661.33m"
    },
    MA_values: [142.46, 142.47, 142.48, 142.49, 142.50, 142.52, 142.54, 142.56, 142.59, 142.61, 142.63],
    profitFactor: {
      value: "1.85",
      change: "+0.15",
      info: "Ratio of gross profit to gross loss. Higher is better."
    },
    sharpeRatio: {
      value: "1.2",
      change: "+0.1",
      info: "Risk-adjusted return. Above 1 is good, above 2 is very good."
    },
    maxDrawdown: {
      value: "15.5%",
      change: "-2.3%",
      info: "Largest peak-to-trough decline. Lower is better."
    }
  };

  res.status(200).json(fakeData);
}