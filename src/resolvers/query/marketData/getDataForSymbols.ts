import type { DataSeries } from '../../../resolvers-types.js';
import { unixTimestampToYyyyMmDdDateString } from '../../../utils/dateWranglers.js';
import { getFredUrl } from './queryingFunctions/endpoints.js';
import queryFred from './queryingFunctions/queryFred.js';

const getDataForSymbols = async (
  parent,
  { symbols, symbolType, from, to },
  ctx,
  info
) => {
  const start = unixTimestampToYyyyMmDdDateString(from);
  const end = '9999-12-31'; // This is the "real-time max date" and will always get the most up to date data from FRED

  const promises = [];

  for (const symbol of symbols) {
    const fredUrl = getFredUrl(symbol, start, end);
    promises.push(queryFred(fredUrl, symbol));
  }

  try {
    return await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

export default getDataForSymbols;
