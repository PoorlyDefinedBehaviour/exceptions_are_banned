import { Option } from "fp-ts/lib/Option"
import { User } from "../entities/user_entity"
import { Either } from "fp-ts/lib/Either"
import { Failure } from "../../core/interfaces/failure"

export interface IUserRepository {
  findOneByCpf: (cpf: string) => Promise<Option<User>>
  findOneByEmail: (email: string) => Promise<Option<User>>
  findOneByUsername: (username: string) => Promise<Option<User>>
  save: (user: User) => Promise<Either<Failure, User>>
}
