import fetch from 'node-fetch';
import { CandleSet, Candle } from '../../../../resolvers-types.js';
import { getGroupedDailyBarsUrl } from '../queryingFunctions/endpoints.js';
import getTokenString from '../queryingFunctions/getTokenString.js';
import queryPolygon, {
  PolygonError,
  PolygonUnauthorized,
} from '../queryingFunctions/queryPolygon.js';

// * Returns a CandleSet for a large array of symbols. The way this works is we'll hit the Grouped Daily (Bars) endpoint on Polygon and then filter to find the requested symbols. This is quite limited though, and we'll only get a single daily candle for each symbol. This is mostly useful while I'm using the free plan.
type Signature = (symbols: string[]) => Promise<CandleSet[]>;

interface BulkStockCandle {
  T: string;
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

interface BulkStockDataResponseSuccess {
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  resultsCount: number;
  status: 'DELAYED';
  results: BulkStockCandle[];
}

type PolygonBulkResponse =
  | BulkStockDataResponseSuccess
  | PolygonUnauthorized
  | PolygonError;

const getBulkStockData: Signature = async (symbols) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
  const day = yesterday.getDate().toString().padStart(2, '0');

  const formattedYesterday = `${year}-${month}-${day}`;

  const bulkStockDataUrl = getGroupedDailyBarsUrl(formattedYesterday);

  const rawData = await fetch(bulkStockDataUrl, {
    headers: {
      Authorization: getTokenString('polygon'),
    },
  });
  const response = (await rawData.json()) as PolygonBulkResponse;

  if (response.status === 'NOT_AUTHORIZED') {
    throw new Error(response.message);
  }
  if (response.status === 'ERROR') {
    throw new Error(response.error);
  }

  const fullData = response.results;

  const filteredData = fullData.filter((candle) => {
    const symbol = candle.T;

    return symbols.includes(symbol);
  });

  const candleSets: CandleSet[] = filteredData.map((result) => {
    const { c, h, l, o, t, T } = result;
    const candle: Candle = {
      close: `${c}`,
      high: `${h}`,
      low: `${l}`,
      open: `${o}`,
      time: `${t}`,
    };

    return { symbol: T, candles: [candle] };
  });

  return candleSets;
};

export default getBulkStockData;
