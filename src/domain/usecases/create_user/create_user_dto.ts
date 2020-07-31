import { Gender } from "../../entities/user_entity"

export interface CreateUserDTO {
  readonly cpf: string
  readonly username: string
  readonly email: string
  readonly displayName: string
  readonly country: string
  readonly gender: Gender
}
