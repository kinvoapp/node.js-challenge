import Record from "../models/recordModel";
import { TransactionDTO } from "../DTO/transaction-DTO";

const updateRecord = (id: string, data: TransactionDTO) => {
  return Record.findByIdAndUpdate(id, data);
};
export default updateRecord;
