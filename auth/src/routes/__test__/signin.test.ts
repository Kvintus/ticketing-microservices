import { generateSignInRequest, signUpRequest, testCredentials } from './utils';

it('fails when an email that does not exists is provided', async () => {
  await generateSignInRequest(testCredentials).expect(400)
})

it('fails when an incorrect password is provided', async () => {
  await signUpRequest(testCredentials).expect(201);
  await generateSignInRequest({
    email: testCredentials.email,
    password: "aninvalidpassword"
  }).expect(400)
})

it('responds with a cookie after a successful signin', async () => {
  await signUpRequest(testCredentials).expect(201);
  const response = await generateSignInRequest(testCredentials).expect(200)
  expect(response.get('Set-Cookie')).toBeDefined()
})