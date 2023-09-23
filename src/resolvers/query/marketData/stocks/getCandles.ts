import fetch from 'node-fetch';
import mockCandles from './mockData.js';
import { getStockCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  CandleResponse,
} from '../queryingFunctions/queryMarketData.js';

export interface Candle {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  time: string;
}

const getCandles = async (
  parent,
  { symbol, from, to, resolution },
  ctx,
  info
) => {
  const url = getStockCandlesUrl({ resolution, symbol, from, to });

  const data: CandleResponse = await queryMarketData(url);

  const candles = [];
  for (let i = 0; i < data.o.length; i += 1) {
    candles.push({
      open: null,
      high: null,
      low: null,
      close: null,
      volume: null,
      time: null,
    });
  }

  const parameters = [
    { abbreviation: 'o', full: 'open' },
    { abbreviation: 'h', full: 'high' },
    { abbreviation: 'l', full: 'low' },
    { abbreviation: 'c', full: 'close' },
    { abbreviation: 'v', full: 'volume' },
    { abbreviation: 't', full: 'time' },
  ];
  parameters.forEach((obj) => {
    data[obj.abbreviation].forEach((value, index) => {
      candles[index][obj.full] = value;
    });
  });

  // const candles: Candle[] = mockCandles;
  return candles;
};

export default getCandles;
