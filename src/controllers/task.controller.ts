import { Request, Response } from "express"

let tasks: any[] = []
let idCounter = 1

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body
  const user = (req as any).user

  const task = {
    id: idCounter++,
    title,
    completed: false,
    userEmail: user.email
  }

  tasks.push(task)
  res.json(task)
}

export const getTasks = (req: Request, res: Response) => {
  const user = (req as any).user
  const userTasks = tasks.filter(t => t.userEmail === user.email)
  res.json(userTasks)
}

export const toggleTask = (req: Request, res: Response) => {
  const { id } = req.params
  const user = (req as any).user

  const task = tasks.find(
    t => t.id === Number(id) && t.userEmail === user.email
  )

  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  task.completed = !task.completed
  res.json(task)
}

export const deleteTask = (req: Request, res: Response) => {
  const { id } = req.params
  const user = (req as any).user

  tasks = tasks.filter(
    t => !(t.id === Number(id) && t.userEmail === user.email)
  )

  res.json({ message: "Task deleted" })
}