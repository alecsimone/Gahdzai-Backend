import { MarketDataCandleResponse } from '../queryingFunctions/queryMarketData.js';
import getPercentageChangesFromCandles from './getPercentageChangesFromCandles.js';
import getPreviousClose from './getPreviousClose.js';
import makeCloseOnlyCandles from './makeCloseOnlyCandles.js';
import sortCandlesByDate from './sortCandlesByDate.js';

interface PercentageChangeGetterInterface {
  data: MarketDataCandleResponse;
  from: string;
  to: string;
}

const getPercentageChangesFromCandleResponse = ({
  data,
  from,
  to,
}: PercentageChangeGetterInterface) => {
  const candles = makeCloseOnlyCandles(data);
  candles.sort((a, b) => {
    return parseInt(a.time, 10) - parseInt(b.time, 10);
  });

  const trimmedCandles = candles.filter((candle) => {
    if (candle.time < from || candle.time > to) {
      return false;
    }
    return true;
  });
  const initialValue = parseInt(trimmedCandles[0].close, 10);

  const percentageChanges = getPercentageChangesFromCandles(
    trimmedCandles,
    initialValue
  );

  return {
    values: percentageChanges,
    previousClose: initialValue,
    latestValue: parseFloat(trimmedCandles.at(-1).close),
  };
};

export default getPercentageChangesFromCandleResponse;
