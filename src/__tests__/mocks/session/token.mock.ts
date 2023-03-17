import { sign } from "jsonwebtoken";

const secretKey: string = "1234";
process.env.SECRET_KEY = secretKey;

export const generateToken = {
  isValidtoken: (admin: boolean, email: string, id: number) => {
    return sign({ admin, email }, secretKey, {
      expiresIn: "24h",
      subject: id.toString(),
    });
  },
  invalidSignature: sign({ admin: true }, "invalid_signature"),
  jwtMalformed: "12345",
};
