import { Router, Response } from "express";
import { AuthenticateStudentController } from "./controllers/Student/AuthenticateStudentController";
import { CreateStudentController } from "./controllers/Student/CreateStudentController";

const router = Router();

const createStudentController = new CreateStudentController();
const authenticateStudentController = new AuthenticateStudentController();

router.get("/", (_, response: Response) => {
  return response.json({
    ok: true,
  });
});

router.post("/student", createStudentController.handle);
router.post("/login/student", authenticateStudentController.handle);

export { router };
