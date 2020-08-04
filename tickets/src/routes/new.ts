import express, { Request, Response } from "express";
import { currentUser, requireAuth, validateRequest } from "@msticketing/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  currentUser,
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("The title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than zero"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(200).send();
  }
);

export { router as createTicketRouter };
