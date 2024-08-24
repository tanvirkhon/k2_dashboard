import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import BotControls from "./BotControls";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimePeriod = "daily" | "weekly" | "monthly";

type DashboardData = {
  performance: {
    revenue: string;
    change: string;
    chartData: number[];
  };
  status: Record<string, string>;
  MA_values: number[];
  profitFactor: { value: string; change: string; info: string };
  sharpeRatio: { value: string; change: string; info: string };
  maxDrawdown: { value: string; change: string; info: string };
};

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { color: "rgba(255, 255, 255, 0.1)" },
      ticks: { color: "rgba(255, 255, 255, 0.7)" },
    },
    y: {
      grid: { color: "rgba(255, 255, 255, 0.1)" },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
        callback: (value) => `$${value.toLocaleString()}`,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
};

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/trading-bot-data');
        const data = await response.json();
        setDashboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !dashboardData) {
    return <div className="flex items-center justify-center h-full text-2xl font-bold text-white">Loading...</div>;
  }

  const { performance, status, MA_values, profitFactor, sharpeRatio, maxDrawdown } = dashboardData;

  const performanceChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
      label: "Revenue",
      data: performance.chartData,
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
      tension: 0.4,
    }],
  };

  const maChartData = {
    labels: MA_values.map((_, index) => `MA ${index + 1}`),
    datasets: [{
      label: "MA Values",
      data: MA_values,
      borderColor: "rgba(75, 192, 192, 1)",
      tension: 0.1,
    }],
  };

  return (
    <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Trading Bot Overview</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Performance</h2>
              <div className="flex space-x-2">
                {(["daily", "weekly", "monthly"] as const).map((period) => (
                  <button
                    key={period}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                      timePeriod === period
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
                    }`}
                    onClick={() => setTimePeriod(period)}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-80 bg-gray-700 rounded-lg">
              <Line data={performanceChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Performance Summary</h2>
            <div className="space-y-4">
              <StatusItem label="Total Revenue" value={performance.revenue} valueColor="text-green-400" />
              <StatusItem label="Change" value={performance.change} valueColor={performance.change.startsWith("+") ? "text-green-400" : "text-red-400"} />
              <StatusItem label="Cumulative ROI" value={status.cumulative_roi || "N/A"} valueColor="text-blue-400" />
              <StatusItem label="Current PNL" value={status.current_pnl || "N/A"} valueColor="text-green-400" />
              <BotControls />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Moving Average Chart</h2>
            <div className="h-80 bg-gray-700 rounded-lg">
              <Line data={maChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Bot Status</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(status).map(([key, value]) => (
                <StatusItem key={key} label={key.replace(/_/g, " ")} value={value} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Profit Factor" value={profitFactor.value} change={profitFactor.change} info={profitFactor.info} />
          <StatCard title="Sharpe Ratio" value={sharpeRatio.value} change={sharpeRatio.change} info={sharpeRatio.info} />
          <StatCard title="Max Drawdown" value={maxDrawdown.value} change={maxDrawdown.change} info={maxDrawdown.info} />
        </div>
      </div>
    </div>
  );
}

const StatusItem: React.FC<{ label: string; value: string; valueColor?: string }> = ({ label, value, valueColor = "text-white" }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className={`font-semibold ${valueColor}`}>{value}</span>
  </div>
);
