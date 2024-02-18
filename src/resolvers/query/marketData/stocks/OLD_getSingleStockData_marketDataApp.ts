import { CandleSet } from '../../../../resolvers-types.js';
import makeCandlesFromMarketDataData from '../dataWranglers/makeCandlesFromMarketDataData.js';
import { getStockCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  MarketDataCandleResponse,
} from '../queryingFunctions/queryMarketData.js';
import { Timespans } from '../queryingFunctions/endpoints.js';
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
  const data: MarketDataCandleResponse = await queryMarketData(candlesUrl);

  const allCandles = makeCandlesFromMarketDataData(data);
  const candles = allCandles.filter((candle) => {
    if (
      parseInt(candle.time, 10) < parseInt(from, 10) ||
      parseInt(candle.time, 10) > parseInt(to, 10)
    ) {
      return false;
    }
    return true;
  });
  return { symbol, candles };
};

export default getSingleStockData;
