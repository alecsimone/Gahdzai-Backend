import getSingleIndexData from './getSingleIndexData.js';
import {
  PercentageChangeValue,
  PercentageChanges,
} from '../../../../resolvers-types.js';

const indexSymbols = ['SPX', 'DJI', 'COMP', 'RUT'];
// const indexSymbols = ['SPX', 'COMP'];

const getAllIndexData = async (parent, { from, to, resolution }, ctx, info) => {
  console.log("Let's get all the index candles");
  let percentageChangesArray: PercentageChanges[] = [];
  for (let i = 0; i < indexSymbols.length; i += 1) {
    const symbol = indexSymbols[i];

    const values: Promise<PercentageChangeValue[]> = getSingleIndexData(
      symbol,
      from,
      to,
      resolution
    ).catch((e) => {
      console.log(e);
      throw new Error(e);
    });

    const percentageChanges = {
      symbol,
      values: await values,
    };

    percentageChangesArray.push(percentageChanges);
  }

  return percentageChangesArray;
};

export default getAllIndexData;
