import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { generateUserJwtAndStoreInSession } from "../services/jwt-service";
import { Password } from "../services/password";
import { BadRequestError, validateRequest } from "@msticketing/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    generateUserJwtAndStoreInSession(existingUser, req);
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
