import request from "supertest";
import { app } from "../../app";

export interface AuthParams {
  email?: string;
  password?: string;
}

export const testCredentials = {
  email: "test@test.com",
  password: "password",
};

export const signUpRequest = (data: AuthParams) =>
  request(app).post("/api/users/signup").send(data);

export const generateSignInRequest = (data: AuthParams) =>
  request(app).post("/api/users/signin").send(data);
