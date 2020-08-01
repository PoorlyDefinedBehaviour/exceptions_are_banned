import dotenv from "dotenv"

const dotEnvFilePath = /test/.test(process.env.NODE_ENV!)
  ? ".env.testing"
  : ".env"

const { parsed } = dotenv.config({ path: dotEnvFilePath })

if (!parsed) {
  throw new Error(`failed to parsed env file -> ${dotEnvFilePath}`)
}

const get = (key: string): string => {
  const value = parsed[key]

  if (!value) {
    throw new Error(`missing env key: ${key}`)
  }
  return value
}

const keys = [
  "NODE_ENV",
  "PORT",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_DATABASE",
  "REDIS_PASSWORD",
] as const

export const env = Object.fromEntries(keys.map(key => [key, get(key)])) as {
  [key in typeof keys[number]]: string
}
