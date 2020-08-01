import { env } from "./src/config/env"
import Knex from "knex"

module.exports = {
  dev: {
    client: "mysql2",
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    },
    migrations: {
      directory: `${__dirname}/src/infra/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/infra/database/seeds`,
    },
  },
  test: {
    client: "mysql2",
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
    },
    migrations: {
      directory: `${__dirname}/src/infra/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/infra/database/seeds`,
    },
  },
} as Record<string, Knex.Config>
