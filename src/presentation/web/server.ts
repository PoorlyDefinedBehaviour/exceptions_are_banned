import "reflect-metadata"
import { env } from "../../config/env"

import { container } from "tsyringe"

import { UserRepository } from "../../infra/database/repositories/user_repository"

container.register("IUserRepository", {
  useClass: UserRepository,
})

import express from "express"
import cors from "cors"
import { loadRoutes } from "./utils/load_routes"

export const app = express()
  .disable("x-powered-by")
  .use(express.json())
  .use(cors())

loadRoutes(app)

app.use("/users", (_, res) => res.send("hello world"))

export const startServer = () => {
  return app.listen(env.PORT, () =>
    console.log(`Listening on port ${env.PORT}`)
  )
}
