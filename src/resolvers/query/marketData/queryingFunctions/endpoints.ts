interface CandlesParameters {
  resolution: string;
  symbol: string;
  from: string;
  to: string;
}

export const getIndexCandlesUrl = ({
  resolution,
  symbol,
  from,
  to,
}: CandlesParameters) =>
  `https://api.marketdata.app/v1/indices/candles/${resolution}/${symbol}?from=${from}&to=${to}`;

export const getStockCandlesUrl = ({
  resolution,
  symbol,
  from,
  to,
}: CandlesParameters) =>
  `https://api.marketdata.app/v1/stocks/candles/${resolution}/${symbol}?from=${from}&to=${to}`;
