import getPercentageChangesFromCandleResponse from '../dataWranglers/getPercentageChangesFromCandleResponse.js';
import { getIndexCandlesUrl } from '../queryingFunctions/endpoints.js';
import queryMarketData, {
  CandleResponse,
} from '../queryingFunctions/queryMarketData.js';

const getSingleIndexData = async (
  symbol: string,
  from: string,
  to: string,
  resolution: string
) => {
  const candlesUrl = getIndexCandlesUrl({ resolution, symbol, from, to });
  const data: CandleResponse = await queryMarketData(candlesUrl);

  const percentageChanges = getPercentageChangesFromCandleResponse(data);

  return { ...percentageChanges, symbol };
};

export default getSingleIndexData;
