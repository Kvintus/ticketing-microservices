import jwt from 'jsonwebtoken';

export const signin = () => {
  const payload = {
    id: 'aklsdjfl;kasdjf',
    email: "test@test.com"
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const sessionObject = { jwt: token };
  const sessionJson = JSON.stringify(sessionObject);
  const base64 = Buffer.from(sessionJson).toString('base64');

  return [`express:sess=${base64}`]
}