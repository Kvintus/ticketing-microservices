import { signin } from './../../test/test-utils';
import { signUpRequest, testCredentials } from './utils';
import request from "supertest";
import { app } from "../../app";

it('responds with details of current user', async () => {
  const cookie = await signin()
  
  const resp = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

    expect(resp.body.currentUser.email).toEqual(testCredentials.email)
})

it('responds with an udefined user', async () => {
  
  const resp = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200)

  expect(resp.body.currentUser).toBeNull()
})