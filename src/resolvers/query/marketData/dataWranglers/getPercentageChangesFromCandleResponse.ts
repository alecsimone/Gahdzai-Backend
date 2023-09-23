import { CandleResponse } from '../queryingFunctions/queryMarketData.js';
import getPercentageChangesFromCandles from './getPercentageChangesFromCandles.js';
import getPreviousClose from './getPreviousClose.js';
import makeCloseOnlyCandles from './makeCloseOnlyCandles.js';
import sortCandlesByDate from './sortCandlesByDate.js';

const getPercentageChangesFromCandleResponse = (data: CandleResponse) => {
  const candles = makeCloseOnlyCandles(data);
  const candlesByDate = sortCandlesByDate(candles);

  const todaysCandles = candlesByDate.at(-1).candles;
  const previousClose = getPreviousClose(candlesByDate);

  const percentageChanges = getPercentageChangesFromCandles(
    todaysCandles,
    previousClose
  );

  return percentageChanges;
};

export default getPercentageChangesFromCandleResponse;
