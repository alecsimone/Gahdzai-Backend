import { Candle } from '../../../../resolvers-types.js';
import { CandleResponse } from '../queryingFunctions/queryMarketData.js';

const makeCandlesFromData = (data: CandleResponse): Candle[] => {
  const candles = [];
  for (let i = 0; i < data.o.length; i += 1) {
    candles.push({
      open: null,
      high: null,
      low: null,
      close: null,
      volume: null,
      time: null,
    });
  }

  const parameters = [
    { abbreviation: 'o', full: 'open' },
    { abbreviation: 'h', full: 'high' },
    { abbreviation: 'l', full: 'low' },
    { abbreviation: 'c', full: 'close' },
    { abbreviation: 'v', full: 'volume' },
    { abbreviation: 't', full: 'time' },
  ];
  parameters.forEach((obj) => {
    if (data[obj.abbreviation] != null) {
      data[obj.abbreviation].forEach((value, index) => {
        candles[index][obj.full] = value;
      });
    }
  });

  return candles;
};

export default makeCandlesFromData;
