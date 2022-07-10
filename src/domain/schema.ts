import { number, object, string } from "zod";

export const createStudentSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
    document: string({
      required_error: "Document is required",
    }),
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

export const updateTransactionSchema = object({
  body: object({
    amount: number().optional(),
    description: string().optional(),
    type: string().optional(),
  }),
});
