import { currentUser } from './../../common/src/middlewares/current-user';
import { errorHandler, NotFoundError, currentUser } from "@msticketing/common";
import { json } from "body-parser";
import cookieSession from 'cookie-session';
import express from "express";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";


const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}))

app.use(createTicketRouter)

app.use(currentUser)

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
