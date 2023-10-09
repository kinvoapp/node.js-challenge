import regex from "@/utils/regex";

export function deleteData(id: string): boolean {
  let isValid = true;

  const isString = typeof id === "string";
  isValid &&= isString;

  const isUUID = regex.UUID.test(id);
  isValid &&= isUUID;

  return isValid;
}
