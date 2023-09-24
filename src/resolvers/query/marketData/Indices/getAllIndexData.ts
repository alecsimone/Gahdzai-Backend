import getSingleIndexData from './getSingleIndexData.js';
import {
  PercentageChangeValue,
  PercentageChanges,
} from '../../../../resolvers-types.js';

const indexSymbols = ['SPX', 'COMP', 'DJI', 'RUT'];
// const indexSymbols = ['SPX', 'COMP'];

const getAllIndexData = async (parent, { from, to, resolution }, ctx, info) => {
  console.log("Let's get all the index candles");
  let percentageChangesArray: PercentageChanges[] = [];
  for (let i = 0; i < indexSymbols.length; i += 1) {
    const symbol = indexSymbols[i];

    const {
      values,
      previousClose,
      latestValue,
    }: {
      values: PercentageChangeValue[];
      previousClose: number;
      latestValue: number;
    } = await getSingleIndexData(symbol, from, to, resolution).catch((e) => {
      console.log(e);
      throw new Error(e);
    });

    const percentageChanges = {
      symbol,
      values,
      previousClose,
      latestValue,
    };

    percentageChangesArray.push(percentageChanges);
  }

  return percentageChangesArray;
};

export default getAllIndexData;
