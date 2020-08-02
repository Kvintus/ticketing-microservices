import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserDocument } from './../models/user';

export const generateUserJwtAndStoreInSession = (user: UserDocument, req: Request) => {
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!)

  req.session = {
    jwt: userJwt
  }
}