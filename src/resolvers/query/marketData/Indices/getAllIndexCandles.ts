import { Candle, candleResponse } from '../stocks/getCandles.js';
import mockCandles from '../stocks/mockData.js';
import getSingleIndexCandles from './getSingleIndexCandles.js';
import { CandleCollection } from '../../../../resolvers-types.js';

const indexSymbols = ['SPX', 'DJIA', 'NQ', 'RUT'];

const getAllIndexCandles = async (
  parent,
  { from, to, resolution },
  ctx,
  info
) => {
  console.log("Let's get all the index candles");
  let candleCollections: CandleCollection[] = [];
  for (let i = 0; i < indexSymbols.length; i += 1) {
    const symbol = indexSymbols[i];

    const candles: Promise<Candle[]> = getSingleIndexCandles(
      symbol,
      from,
      to,
      resolution
    ).catch((e) => {
      console.log(e);
      throw new Error(e);
    });

    const candleCollection = {
      symbol,
      candles: await candles,
    };

    candleCollections.push(candleCollection);
  }

  return candleCollections;
};

export default getAllIndexCandles;
