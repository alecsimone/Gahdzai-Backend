import makeSafeDecimals from '../../../../utils/makeSafeDecimals.js';
import { CandlesByDate } from './sortCandlesByDate.js';

const getPreviousClose = (candlesByDate: CandlesByDate[]) => {
  const penultimateDate = candlesByDate.at(-2);
  const penultimateDateCandles = penultimateDate.candles;
  penultimateDateCandles.sort((a, b) => {
    const aInt = parseInt(a.time, 10);
    const bInt = parseInt(b.time, 10);

    return aInt - bInt;
  });
  const previousClose = makeSafeDecimals(
    parseFloat(penultimateDateCandles.at(-1).close)
  );

  return previousClose;
};

export default getPreviousClose;
