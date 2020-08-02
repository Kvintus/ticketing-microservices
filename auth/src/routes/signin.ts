import { BadRequestError } from './../errors/bad-request-error';
import { validateRequest } from "./../middlewares/validate-request";
import { authValidationRules } from "./signup";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { Password } from '../services/password';
import { generateUserJwtAndStoreInSession } from '../services/jwt-service';

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

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }
    
    generateUserJwtAndStoreInSession(existingUser, req);
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
