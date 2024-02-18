import fetch from 'node-fetch';
import getTokenString from './getTokenString.js';

export interface MarketDataCandleResponse {
  s?: 'ok' | 'no_data' | 'error';
  o?: number[];
  h?: number[];
  l?: number[];
  c?: number[];
  v?: number[];
  t?: number[];
  errmsg?: string;
}

export interface quoteResponse {
  s?: 'ok' | 'no_data' | 'error';
  symbol?: string[];
  last?: number[];
  change?: number[];
  changepct?: number[];
  '52weekHigh'?: number[];
  '52weekLow'?: number[];
  updated?: string[];
  errmsg?: string;
}

const queryMarketData = async (url: string) => {
  const rawData = await fetch(url, {
    headers: {
      Authorization: getTokenString('marketData'),
    },
  });

  const queryLimit = parseInt(rawData.headers.get('x-api-ratelimit-limit'), 10);
  const remainingQueries = parseInt(
    rawData.headers.get('x-api-ratelimit-remaining'),
    10
  );
  console.log(
    `MarketData.app API usage: ${
      queryLimit - remainingQueries
    }/${queryLimit} Daily Requests`
  );

  const data: MarketDataCandleResponse = await rawData.json();

  if (data.s === 'error') {
    throw new Error(data.errmsg);
  }
  if (data.s === 'no_data') {
    throw new Error(`No data found at ${url}`);
  }

  return data;
};

export default queryMarketData;
