import getSingleIndexData from './Indices/getSingleIndexData.js';
import getSingleStockData from './stocks/getSingleStockData.js';

const getCandlesForSymbols = async (
  parent,
  { symbols, symbolType, from, to, resolution },
  ctx,
  info
) => {
  const promises = [];

  if (symbolType === 'index') {
    for (const symbol of symbols) {
      promises.push(getSingleIndexData(symbol, from, to, resolution));
    }
  } else if (symbolType === 'stock') {
    for (const symbol of symbols) {
      promises.push(getSingleStockData(symbol, from, to, resolution));
    }
  }

  try {
    return await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

export default getCandlesForSymbols;
