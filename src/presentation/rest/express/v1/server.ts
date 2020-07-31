import dotenv from "dotenv"

if (/test/.test(process.env.NODE_ENV!)) {
  dotenv.config({ path: "../../../../../.env.testing" })
} else {
  dotenv.config()
}

import express from "express"
import cors from "cors"
import { env } from "../../../../config/env"

export const app = express()

export const startServer = async () => {
  app.use(express.json())
  app.use(cors())

  return app.listen(env.PORT)
}
