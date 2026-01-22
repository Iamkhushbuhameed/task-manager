import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt"

const users: any[] = []   

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  users.push({ email, password: hashedPassword })

  res.json({ message: "User registered successfully" })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

  const token = generateToken({ email })

  res.json({ accessToken: token })

}
