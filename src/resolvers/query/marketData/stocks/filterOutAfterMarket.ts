import { Candle } from '../../../../resolvers-types';

// * Filters a list of stock candles to remove any after hours candles
type Signature = (allCandles: Candle[]) => Candle[];

const filterOutAfterMarket: Signature = (allCandles) => {
  const candles = allCandles.filter((candle) => {
    const { time } = candle;
    const timeAsDate = new Date(parseInt(time, 10));

    const hourInETString = timeAsDate.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      hour12: false,
    });
    const hourInET = parseInt(hourInETString, 10);

    if (hourInET >= 16) return false;
    if (hourInET > 9) return true;
    if (hourInET < 9) return false;

    const minuteInETString = timeAsDate.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      minute: 'numeric',
    });
    const minuteInET = parseInt(minuteInETString, 10);

    if (hourInET === 9 && minuteInET < 30) return false;

    return true;
  });

  return candles;
};

export default filterOutAfterMarket;
