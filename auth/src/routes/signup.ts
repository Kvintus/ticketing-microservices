import { BadRequestError } from "./../errors/bad-request-error";
import { RequestValidationError } from "./../errors/request-validation-error";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { generateUserJwtAndStoreInSession } from "../services/jwt-service";

const router = express.Router();

export const authValidationRules = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

router.post(
  "/api/users/signup",
  authValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email address already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    try {
      generateUserJwtAndStoreInSession(user, req);
    } catch (error) {}
    res.status(201).send(user);
  }
);

export { router as signupRouter };
