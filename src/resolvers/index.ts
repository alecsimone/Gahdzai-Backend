import logOut from './mutation/user/logOut.js';
import logIn from './mutation/user/logIn.js';
import createUser from './mutation/user/createUser.js';
import currentUser from './query/user/currentUser.js';
import { Resolvers } from '../resolvers-types.js';
import getCandles from './query/marketData/stocks/getCandles.js';
import getAllIndexData from './query/marketData/Indices/getAllIndexData.js';

const resolvers: Resolvers = {
  Query: {
    currentUser,
    getCandles,
    getAllIndexData,
  },
  Mutation: {
    createUser,
    logIn,
    logOut,
  },
};

export default resolvers;
