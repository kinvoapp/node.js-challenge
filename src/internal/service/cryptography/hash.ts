import bcrypt from "bcrypt";
import cryptConstants from "./constants";

export default async function hash(text: string) {
  return await bcrypt.hash(text, cryptConstants.salt);
}
