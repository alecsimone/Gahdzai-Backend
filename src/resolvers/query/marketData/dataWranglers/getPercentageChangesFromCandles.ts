import { PercentageChangeValue } from '../../../../resolvers-types.js';
import makeSafeDecimals from '../../../../utils/makeSafeDecimals.js';
import { CloseOnlyCandles } from './makeCloseOnlyCandles.js';

const getPercentageChangesFromCandles = (
  candles: CloseOnlyCandles[],
  previousClose: number
) => {
  const values = candles.map((candle) => {
    const safeClose = makeSafeDecimals(candle.close);
    const percentageChange =
      (100 * makeSafeDecimals(safeClose - previousClose)) / previousClose;
    const { time } = candle;
    const percentageChangeValue: PercentageChangeValue = {
      time,
      percentageChange,
    };

    return percentageChangeValue;
  });

  return values;
};

export default getPercentageChangesFromCandles;
