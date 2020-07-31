import { Option } from "fp-ts/lib/Option"
import { User } from "../entities/user_entity"

export interface UserRepository {
  findOneByCpf: (cpf: string) => Promise<Option<User>>
  findOneByEmail: (email: string) => Promise<Option<User>>
  findOneByUsername: (username: string) => Promise<Option<User>>
  save: (user: User) => Promise<void>
}
