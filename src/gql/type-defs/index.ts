import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import path from "path";
import { cwd } from "process";

export default async function getTypeDefs() {
  return await loadSchema(path.join(cwd(), "src/gql/type-defs/**/*.gql"), {
    loaders: [new GraphQLFileLoader()],
  });
}
