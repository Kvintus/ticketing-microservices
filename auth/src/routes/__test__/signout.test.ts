import { signUpRequest, testCredentials } from './utils';
import request from "supertest";
import { app } from "../../app";

it('clears the cookie after signout', async () => {
  await signUpRequest(testCredentials).expect(201)
  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})