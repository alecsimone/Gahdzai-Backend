import getPercentageChangesFromCandleResponse from '../dataWranglers/getPercentageChangesFromCandleResponse.js';
import { CandleSet } from '../../../../resolvers-types.js';
import makeCandlesFromData from '../dataWranglers/makeCandlesFromData.js';
import { getIndexCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  CandleResponse,
} from '../queryingFunctions/queryMarketData.js';

const getSingleIndexData = async (
  symbol: string,
  from: string,
  to: string,
  resolution: string
): Promise<CandleSet> => {
  const candlesUrl = getIndexCandlesUrl({ resolution, symbol, from, to });
  const data: CandleResponse = await queryMarketData(candlesUrl);

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

  // const percentageChanges = getPercentageChangesFromCandleResponse({
  //   data,
  //   from,
  //   to,
  // });

  // return { ...percentageChanges, symbol };
};

export default getSingleIndexData;
