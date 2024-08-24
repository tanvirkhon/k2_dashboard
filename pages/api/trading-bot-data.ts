import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${process.env.CONTABO_SERVER_URL}/api/trading-bot-data`, {
      headers: {
        'Authorization': `Bearer ${process.env.CONTABO_API_KEY}`
      }
    });

    const data = response.data;

    // Process the data if needed
    const processedData = {
      performance: {
        revenue: data.revenue,
        change: data.change,
        chartData: data.performanceData || [],
      },
      status: data.status || {},
      MA_values: data.maValues || [],
      profitFactor: { value: data.profitFactor, change: data.profitFactorChange, info: '' },
      sharpeRatio: { value: data.sharpeRatio, change: data.sharpeRatioChange, info: '' },
      maxDrawdown: { value: data.maxDrawdown, change: data.maxDrawdownChange, info: '' },
    };

    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error fetching trading bot data:', error);
    res.status(500).json({ error: 'Failed to fetch trading bot data' });
  }
}