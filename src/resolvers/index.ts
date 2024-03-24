import logOut from './mutation/user/logOut.js';
import logIn from './mutation/user/logIn.js';
import createUser from './mutation/user/createUser.js';
import currentUser from './query/user/currentUser.js';
import { Resolvers } from '../resolvers-types.js';
import getCandlesForSymbols from './query/marketData/getCandlesForSymbols.js';
import getDataForSymbols from './query/marketData/getDataForSymbols.js';

const resolvers: Resolvers = {
  Query: {
    currentUser,
    getCandlesForSymbols,
    getDataForSymbols,
  },
  Mutation: {
    createUser,
    logIn,
    logOut,
  },
};

export default resolvers;
