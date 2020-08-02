import { requireAuth } from './../middlewares/require-auth';
import { currentUser } from './../middlewares/current-user';
import { BadRequestError } from "./../errors/bad-request-error";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({
    currentUser: req.currentUser || null
  })
});

export { router as currentUserRouter };
