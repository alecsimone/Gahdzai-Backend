import { CandleSet } from '../../../../resolvers-types.js';
import makeCandlesFromMarketDataData from '../dataWranglers/makeCandlesFromMarketDataData.js';
import { getStockCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  MarketDataCandleResponse,
} from '../queryingFunctions/queryMarketData.js';
import { Timespans } from '../queryingFunctions/endpoints.js';
import queryPolygon, {
  PolygonCandleResponseSuccess,
} from '../queryingFunctions/queryPolygon.js';
import makeCandlesFromPolygonData from '../dataWranglers/makeCandlesFromPolygonData.js';
import filterOutAfterMarket from './filterOutAfterMarket.js';
// import candles from './mockData.js';

// * Returns a candle set for a given stock symbol

const getSingleStockData = async (
  symbol: string,
  from: string,
  to: string,
  timespan: Timespans,
  timespanMultiplier: number
): Promise<CandleSet> => {
  const candlesUrl = getStockCandlesUrl({
    timespan,
    timespanMultiplier,
    symbol,
    from,
    to,
  });
  const data: PolygonCandleResponseSuccess = await queryPolygon(candlesUrl);

  const allCandles = makeCandlesFromPolygonData(data);
  const candles = filterOutAfterMarket(allCandles);

  return { symbol, candles };
};

export default getSingleStockData;
