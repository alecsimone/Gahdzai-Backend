import { CloseOnlyCandles } from './makeCloseOnlyCandles';

export interface CandlesByDate {
  date: string;
  candles: CloseOnlyCandles[];
}

const sortCandlesByDate = (candles: CloseOnlyCandles[]) => {
  const candlesByDate: CandlesByDate[] = [];
  candles.forEach((candle) => {
    const { time } = candle;
    const dateObj = new Date(parseInt(time, 10) * 1000);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const date = dateObj.getDate();
    const dateString = `${year}${month < 10 ? `0${month}` : month}${
      date < 10 ? `0${date}` : date
    }`;

    const thisDateIndex = candlesByDate.findIndex(
      (candleByDateObj) => candleByDateObj.date === dateString
    );
    if (thisDateIndex === -1) {
      const newCandleByDate: CandlesByDate = {
        date: dateString,
        candles: [candle],
      };
      candlesByDate.push(newCandleByDate);
    } else {
      candlesByDate[thisDateIndex].candles.push(candle);
    }
  });
  candlesByDate.sort((a, b) => {
    const aInt = parseInt(a.date, 10);
    const bInt = parseInt(b.date, 10);

    return aInt - bInt;
  });

  return candlesByDate;
};

export default sortCandlesByDate;
