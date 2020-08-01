import { injectable } from "tsyringe"
import { knex } from "../index"
import { fromNullable } from "fp-ts/lib/Option"
import { IUserRepository } from "../../../domain/repositories/user_repository"
import { left, right } from "fp-ts/lib/Either"
import { User } from "../../../domain/entities/user_entity"

@injectable()
export class UserRepository implements IUserRepository {
  findOneByEmail = (email: string) =>
    knex("users").where({ email }).first().then(fromNullable)

  findOneByUsername = (username: string) =>
    knex("users").where({ username }).first().then(fromNullable)

  findOneByCpf = (cpf: string) =>
    knex("users").where({ cpf }).first().then(fromNullable)

  save = (user: User) =>
    knex("users")
      .insert(user)
      .then(() => right(user))
      .catch(left)
}
