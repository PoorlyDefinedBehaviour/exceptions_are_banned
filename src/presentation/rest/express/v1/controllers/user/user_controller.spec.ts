import request from "supertest"
import { app } from "../../server"
import { factory } from "../../../../../../tests/factory"

describe("ExpressUserController test suite :: integration", () => {
  test("POST :: when cpf is already in use, should return a response with status 400", async () => {
    const user = await factory.user()

    const response = await request(app).post("/user").send(user).expect(400)

    console.log(!!response)
  })
})
