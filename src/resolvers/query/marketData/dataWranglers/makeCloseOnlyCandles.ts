import { MarketDataCandleResponse } from '../queryingFunctions/queryMarketData';

export interface CloseOnlyCandles {
  close: string;
  time: string;
}

const makeCloseOnlyCandles = (data: MarketDataCandleResponse) => {
  const closeOnlyCandles: CloseOnlyCandles[] = [];
  for (let i = 0; i < data.o.length; i += 1) {
    closeOnlyCandles.push({
      close: null,
      time: null,
    });
  }
  const parameters = [
    { abbreviation: 'c', full: 'close' },
    { abbreviation: 't', full: 'time' },
  ];
  parameters.forEach((obj) => {
    data[obj.abbreviation].forEach((value, index) => {
      closeOnlyCandles[index][obj.full] = value;
    });
  });

  return closeOnlyCandles;
};

export default makeCloseOnlyCandles;
