import { ID } from "../../core/types/id"

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export class User {
  public readonly id: ID
  public readonly cpf: string
  public readonly username: string
  public readonly email: string
  public readonly country: string
  public readonly gender: Gender

  constructor(data: Omit<User, "id">) {
    Object.assign(this, data)

    // @TODO: generate id
  }
}
