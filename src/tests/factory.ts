import { User, Gender } from "../domain/entities/user_entity"
import faker from "faker"
import generateCpf from "@brazilian-utils/generate-cpf"

const makeUser = async (overrides?: Partial<User>): Promise<User> =>
  new User({
    cpf: generateCpf(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    displayName: faker.internet.userName(),
    country: faker.address.country(),
    gender: faker.random.arrayElement([
      Gender.male,
      Gender.female,
      Gender.other,
    ]),
    ...overrides,
  })

export const factory = {
  user: makeUser,
}
