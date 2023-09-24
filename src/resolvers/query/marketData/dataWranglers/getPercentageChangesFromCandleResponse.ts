import { CandleResponse } from '../queryingFunctions/queryMarketData.js';
import getPercentageChangesFromCandles from './getPercentageChangesFromCandles.js';
import getPreviousClose from './getPreviousClose.js';
import makeCloseOnlyCandles from './makeCloseOnlyCandles.js';
import sortCandlesByDate from './sortCandlesByDate.js';

const getPercentageChangesFromCandleResponse = (data: CandleResponse) => {
  const candles = makeCloseOnlyCandles(data);
  const candlesByDate = sortCandlesByDate(candles);

  const todaysCandles = candlesByDate.at(-1).candles;
  console.log(todaysCandles.at(-1));
  const previousClose = getPreviousClose(candlesByDate);

  const percentageChanges = getPercentageChangesFromCandles(
    todaysCandles,
    previousClose
  );

  return {
    values: percentageChanges,
    previousClose,
    latestValue: parseFloat(todaysCandles.at(-1).close),
  };
};

export default getPercentageChangesFromCandleResponse;
