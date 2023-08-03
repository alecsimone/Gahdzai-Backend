import { readFileSync } from "fs";

const types = readFileSync("./schema/types.graphql", { encoding: "utf-8" });
const queries = readFileSync("./schema/query.graphql", { encoding: "utf-8" });
const mutations = readFileSync("./schema/mutation.graphql", {
  encoding: "utf-8",
});

const typeDefs = types + queries + mutations;

export default typeDefs;
