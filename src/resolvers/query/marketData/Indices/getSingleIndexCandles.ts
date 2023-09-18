import fetch from 'node-fetch';
import { Candle, candleResponse } from '../stocks/getCandles.js';

const getSingleIndexCandles = async (symbol, from, to, resolution) => {
  const url = `https://api.marketdata.app/v1/indices/candles/${resolution}/${symbol}?from=${from}&to=${to}`;
  console.log(`Querying ${symbol}`);

  const token = process.env.MARKET_DATA_APP_TOKEN;
  const rawData = await fetch(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const data: candleResponse = await rawData.json();
  console.log(`Data received for ${symbol}`);

  if (data.s === 'error') {
    throw new Error(data.errmsg);
  }

  if (data.s === 'no_data') {
    return [];
  }

  const candles: Candle[] = [];
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

  return candles;
};

export default getSingleIndexCandles;
