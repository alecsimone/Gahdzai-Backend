import fetch from 'node-fetch';
import getTokenString from './getTokenString.js';

// * Queries polygon.io for candlestick data

interface PolygonCandleResults {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  otc: boolean;
  t: number;
  v: number;
  vw: number;
}

export interface PolygonCandleResponseSuccess {
  ticker: string;
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  resultsCount: number;
  status: 'DELAYED';
  results: PolygonCandleResults[];
  next_url: string;
}

export interface PolygonUnauthorized {
  status: 'NOT_AUTHORIZED';
  request_id: string;
  message: string;
}

interface PolygonError {
  status: 'ERROR';
  request_id: string;
  error: string;
}

type PolygonCandleResponse =
  | PolygonCandleResponseSuccess
  | PolygonUnauthorized
  | PolygonError;

type Signature = (url: string) => Promise<PolygonCandleResponseSuccess>;

const queryPolygon: Signature = async (url) => {
  const rawData = await fetch(url, {
    headers: {
      Authorization: getTokenString('polygon'),
    },
  });

  const data: PolygonCandleResponse =
    (await rawData.json()) as PolygonCandleResponse;

  if (data.status === 'NOT_AUTHORIZED') {
    throw new Error(data.message);
  }
  if (data.status === 'ERROR') {
    throw new Error(data.error);
  }

  const { queryCount, resultsCount, status } = data;
  return data;
};

export default queryPolygon;
