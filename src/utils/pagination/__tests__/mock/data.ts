import { transaction } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const transactionsMock = Array<transaction>(30).fill({
  id: "762e913f-728b-4e45-913d-ab11adeff443",
  amount: new Decimal(0),
  type: "OUT",
  created_at: new Date(),
  updated_at: new Date(),
});
