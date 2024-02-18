export type Timespans =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

interface CandlesParameters {
  timespan: Timespans;
  timespanMultiplier: number;
  symbol: string;
  from: string;
  to: string;
}

const getResolutionFromTimespan = (
  timespan: Timespans,
  timespanMultiplier: number
): string => {
  let resolution = `${timespanMultiplier}`;
  if (timespan !== 'minute') {
    resolution += timespan[0].toUpperCase();
  }

  return resolution;
};

export const getIndexCandlesUrl = ({
  timespan,
  timespanMultiplier,
  symbol,
  from,
  to,
}: CandlesParameters) => {
  const resolution = getResolutionFromTimespan(timespan, timespanMultiplier);

  const secondsFrom = parseInt(from, 10) / 1000;
  const secondsTo = parseInt(to, 10) / 1000;

  return `https://api.marketdata.app/v1/indices/candles/${resolution}/${symbol}?from=${secondsFrom}&to=${secondsTo}`;
};

export const getStockCandlesUrl = ({
  timespan,
  timespanMultiplier,
  symbol,
  from,
  to,
}: CandlesParameters) => {
  const adjustedFromDate = new Date(parseInt(from, 10));
  adjustedFromDate.setDate(adjustedFromDate.getDate() - 1);
  const adjustedFrom = adjustedFromDate.getTime();

  const toDate = new Date(parseInt(to, 10));
  const adjustedTo = toDate.setDate(toDate.getDate() - 1);

  // console.log({
  //   symbol,
  //   timespan,
  //   timespanMultiplier,
  //   adjustedFrom,
  //   adjustedTo,
  // });

  return `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${timespanMultiplier}/${timespan}/${adjustedFrom}/${adjustedTo}?adjusted=true&sort=asc&limit=5000`;
};

// Old marketdata.app
// export const getStockCandlesUrl = ({
//   resolution,
//   symbol,
//   from,
//   to,
// }: CandlesParameters) =>
//   `https://api.marketdata.app/v1/stocks/candles/${resolution}/${symbol}?from=${from}&to=${to}`;
