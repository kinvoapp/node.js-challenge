import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().required(),
      gender: Yup.string().required(),
    });
    const { name, email, age, gender } = req.body;
    let user = await User.findOne({ email });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: "Validation failure." });
    }
    if (!user) {
      user = await User.create({ name, email, age, gender });
    }

    return res.json(user);
  }

  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }
}

export default new SessionController();
