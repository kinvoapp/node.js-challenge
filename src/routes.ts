import { Router, Response } from "express";
import { CreateAccountController } from "./controllers/Account/CreateAccountController";
import { CreateStudentController } from "./controllers/Student/CreateStudentController";

const router = Router();

const createStudentController = new CreateStudentController();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true,
  });
});

router.post("/student", createStudentController.handle);

export { router };
