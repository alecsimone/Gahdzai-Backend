import getPercentageChangesFromCandleResponse from '../dataWranglers/getPercentageChangesFromCandleResponse.js';
import { CandleSet } from '../../../../resolvers-types.js';
import makeCandlesFromMarketDataData from '../dataWranglers/makeCandlesFromMarketDataData.js';
import { getIndexCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  MarketDataCandleResponse,
} from '../queryingFunctions/queryMarketData.js';
import { Timespans } from '../queryingFunctions/endpoints.js';

const getSingleIndexData = async (
  symbol: string,
  from: string,
  to: string,
  timespan: Timespans,
  timespanMultiplier: number
): Promise<CandleSet> => {
  const candlesUrl = getIndexCandlesUrl({
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
      parseInt(candle.time, 10) * 1000 < parseInt(from, 10) ||
      parseInt(candle.time, 10) * 1000 > parseInt(to, 10)
    ) {
      return false;
    }
    return true;
  });
  return { symbol, candles };
};

export default getSingleIndexData;
