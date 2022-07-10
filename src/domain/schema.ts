import { TransactionType } from "@prisma/client";
import { boolean, number, object, string, TypeOf } from "zod";

export const createStudentSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short"),
    document: string({
      required_error: "Document is required",
    }).length(11),
  }),
});

export const authenticateStudentSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }),
    document: string({
      required_error: "Document is required",
    }),
  }),
});

export const createTransactionSchema = object({
  body: object({
    amount: number({
      required_error: "Amount is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    type: string({
      required_error: "Type is required",
    }),
  }),
});
