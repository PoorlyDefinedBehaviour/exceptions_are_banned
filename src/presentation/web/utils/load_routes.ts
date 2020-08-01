import { readdirSync } from "fs"
import { join } from "path"
import { Express } from "express"

export const loadRoutes = (app: Express) => {
  const path = join(__dirname, "..", "routes")

  const files = readdirSync(path).map(name => name.split(".")[0])

  for (const file of files) {
    const { router } = require(join(path, file))
    app.use("/api/v1/", router)
  }
}
