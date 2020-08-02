import { signUpRequest, testCredentials } from './utils';
import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successfull signup", async () => {
  await signUpRequest(testCredentials).expect(201)
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "a",
    })
    .expect(400);
});

it("returns a 400 with with missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicate emails", async () => {
  await signUpRequest(testCredentials).expect(201);
  await signUpRequest(testCredentials).expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await signUpRequest(testCredentials).expect(201)
  expect(response.get('Set-Cookie')).toBeDefined()
})
