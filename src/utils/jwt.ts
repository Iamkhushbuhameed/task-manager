import jwt from "jsonwebtoken"

const JWT_SECRET = "mysecretkey"

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}