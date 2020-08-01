import knexjs from "knex"

import { env } from "../../config/env"

// @ts-ignore
import knexfile from "../../../knexfile"

export const knex = knexjs(knexfile[env.NODE_ENV])
