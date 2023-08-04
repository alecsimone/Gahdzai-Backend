import fetch from 'node-fetch';
import mockCandles from './mockData.js';

interface candleResponse {
  s?: 'ok' | 'no_data' | 'error';
  o?: number[];
  h?: number[];
  l?: number[];
  c?: number[];
  v?: number[];
  t?: number[];
  errmsg?: string;
}

const getCandles = async (
  parent,
  { symbol, from, to, resolution },
  ctx,
  info
) => {
  // const url = `https://api.marketdata.app/v1/stocks/candles/${resolution}/${symbol}?from=${from}&to=${to}`;
  // const rawData = await fetch(url);
  // const data: candleResponse = await rawData.json();

  // if (data.s === 'error') {
  //   throw new Error(data.errmsg);
  // }

  // const candles = [];
  // for (let i = 0; i < data.o.length; i += 1) {
  //   candles.push({
  //     open: null,
  //     high: null,
  //     low: null,
  //     close: null,
  //     volume: null,
  //     time: null,
  //   });
  // }

  // const parameters = [
  //   { abbreviation: 'o', full: 'open' },
  //   { abbreviation: 'h', full: 'high' },
  //   { abbreviation: 'l', full: 'low' },
  //   { abbreviation: 'c', full: 'close' },
  //   { abbreviation: 'v', full: 'volume' },
  //   { abbreviation: 't', full: 'time' },
  // ];
  // parameters.forEach((obj) => {
  //   data[obj.abbreviation].forEach((value, index) => {
  //     candles[index][obj.full] = value;
  //   });
  // });

  const candles = mockCandles;
  return candles;
};

export default getCandles;
