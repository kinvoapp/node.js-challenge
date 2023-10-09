import transactionRepositoryFactory from "@/factory/repository/transaction";
import { Decimal } from "@prisma/client/runtime/library";

const transactionRepositoryMock = transactionRepositoryFactory({
  async create(data) {
    return {
      id: "valid id",
      amount: new Decimal(data.amount),
      type: data.type,
      created_at: new Date(1),
      updated_at: new Date(1),
    };
  },
  async find(_data) {
    return [];
  },
  async findOne(id) {
    return id === "292f3665-46fd-4060-ba5d-2ec9c990aa0c"
      ? {
          id: "292f3665-46fd-4060-ba5d-2ec9c990aa0c",
          amount: new Decimal(100),
          type: "IN",
          created_at: new Date(1),
          updated_at: new Date(1),
        }
      : null;
  },
  async update(_id, _data) {},
  async delete(_id) {},
});

export default transactionRepositoryMock;
