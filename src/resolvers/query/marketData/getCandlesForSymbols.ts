import getSingleIndexData from './Indices/getSingleIndexData.js';
import getBulkStockData from './stocks/getBulkStockData.js';
import getSingleStockData from './stocks/getSingleStockData.js';

const getCandlesForSymbols = async (
  parent,
  { symbols, symbolType, from, to, timespan, timespanMultiplier },
  ctx,
  info
) => {
  const promises = [];

  if (symbolType === 'index') {
    for (const symbol of symbols) {
      promises.push(
        getSingleIndexData(symbol, from, to, timespan, timespanMultiplier)
      );
    }
  } else if (symbolType === 'stock') {
    // TODO Upgrade to paid polygon plan and use this first query for any amount of symbols
    if (symbols.length < 5) {
      for (const symbol of symbols) {
        promises.push(
          getSingleStockData(symbol, from, to, timespan, timespanMultiplier)
        );
      }
    } else {
      return await getBulkStockData(symbols);
    }
  }

  try {
    return await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

export default getCandlesForSymbols;
