import createTransaction from "./create-transaction";
import findTransaction from "./find-transaction";
import updateTransaction from "./update-transaction";
import deleteTransaction from "./delete-transaction";

export const transactionRepository = {
  create: createTransaction,
  find: findTransaction,
  update: updateTransaction,
  delete: deleteTransaction,
};
