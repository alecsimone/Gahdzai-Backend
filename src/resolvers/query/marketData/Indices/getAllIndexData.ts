import getSingleIndexData from './getSingleIndexData.js';
import {
  PercentageChangeValue,
  PercentageChanges,
} from '../../../../resolvers-types.js';

// const indexSymbols = ['SPX', 'COMP', 'DJI', 'RUT'];
const indexSymbols = ['SPX'];

const getAllIndexData = async (parent, { from, to, resolution }, ctx, info) => {
  const promises = [];
  for (const symbol of indexSymbols) {
    promises.push(getSingleIndexData(symbol, from, to, resolution));
  }

  try {
    return await Promise.all(promises);
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllIndexData;
