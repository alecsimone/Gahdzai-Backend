import { PolygonCandleResponseSuccess } from '../queryingFunctions/queryPolygon';
import { Candle } from '../../../../resolvers-types.js';

// * Turns a polygon response object into an array of candles in the format we use them in
type Signature = (data: PolygonCandleResponseSuccess) => Candle[];

const makeCandlesFromPolygonData: Signature = (data) => {
  const { results } = data;
  const candles: Candle[] = results.map((result) => ({
    close: `${result.c}`,
    high: `${result.h}`,
    low: `${result.l}`,
    open: `${result.o}`,
    time: `${result.t}`,
  }));

  return candles;
};

export default makeCandlesFromPolygonData;
