import { GraphQLScalarType } from "graphql";

const Void = new GraphQLScalarType({
  name: "Void",
  description: "Represents NULL values",

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});

export default Void;
