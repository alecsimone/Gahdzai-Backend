import { CandleSet } from '../../../../resolvers-types.js';
import makeCandlesFromData from '../dataWranglers/makeCandlesFromData.js';
import { getStockCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  CandleResponse,
} from '../queryingFunctions/queryMarketData.js';

// * Returns a candle set for a given stock symbol

const getSingleStockData = async (
  symbol: string,
  from: string,
  to: string,
  resolution: string
): Promise<CandleSet> => {
  const candlesUrl = getStockCandlesUrl({ resolution, symbol, from, to });
  const data: CandleResponse = await queryMarketData(candlesUrl);
  console.log(data);

  const allCandles = makeCandlesFromData(data);
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
