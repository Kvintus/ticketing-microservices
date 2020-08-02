import { generateSignInRequest, testCredentials, signUpRequest } from './../routes/__test__/utils';
export const signin = async () => {
  const resp = await signUpRequest(testCredentials).expect(201)
  return resp.get('Set-Cookie')
}