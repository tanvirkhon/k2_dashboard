// api/mockApi.ts

// Types
export type Trade = {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  profit: number;
}
  
  type PerformanceData = {
    revenue: string;
    change: string;
    chartData: number[];
  }
  
  // Mock data
  const mockTrades: Trade[] = [
    { id: 'T1', pair: 'BTC/USD', type: 'buy', amount: 0.5, price: 50000, timestamp: '2023-06-01T10:00:00Z', profit: 250 },
    { id: 'T2', pair: 'ETH/USD', type: 'sell', amount: 2, price: 2000, timestamp: '2023-06-01T11:00:00Z', profit: -50 },
    { id: 'T3', pair: 'BTC/USD', type: 'sell', amount: 0.3, price: 51000, timestamp: '2023-06-01T12:00:00Z', profit: 300 },
    // Add more mock trades as needed
  ];
  
  const mockPerformanceData: Record<string, PerformanceData> = {
    daily: { 
      revenue: '$ 824,444.68', 
      change: '+2.3%',
      chartData: [100000, 150000, 120000, 180000, 200000, 250000, 220000]
    },
    weekly: { 
      revenue: '$ 5,732,114.89', 
      change: '-0.7%',
      chartData: [5000000, 5200000, 4800000, 5100000, 5300000, 5600000, 5700000]
    },
    monthly: { 
      revenue: '$ 23,948,673.21', 
      change: '+5.1%',
      chartData: [20000000, 21000000, 22000000, 21500000, 23000000, 24000000, 23900000]
    },
  };
  
  // Mock API functions
  export async function fetchLatestTrade(): Promise<Trade> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTrades[mockTrades.length - 1];
  }
  
  export async function fetchPerformanceData(timePeriod: 'daily' | 'weekly' | 'monthly'): Promise<PerformanceData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPerformanceData[timePeriod];
  }
  
  export async function fetchRecentTrades(limit: number, page: number): Promise<{ trades: Trade[], total: number }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      trades: mockTrades.slice(start, end),
      total: mockTrades.length
    };
  }

  export async function fetchTradingStats(): Promise<{
    totalProfit: number;
    winRate: number;
    totalTrades: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const totalProfit = mockTrades.reduce((sum, trade) => sum + trade.profit, 0);
    const winningTrades = mockTrades.filter(trade => trade.profit > 0).length;
    return {
      totalProfit,
      winRate: (winningTrades / mockTrades.length) * 100,
      totalTrades: mockTrades.length
    };
  }