import { injectable, inject } from "tsyringe"
import { UserRepository } from "../../repositories/user_repository"
import { CreateUserDTO } from "./create_user_dto"
import { User } from "../../entities/user_entity"
import E from "fp-ts/lib/Either"
import { Failure } from "../../../core/interfaces/failure"

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  execute = async (data: CreateUserDTO): Promise<E.Either<Failure[], User>> => {
    // @TODO: Validate fields
    if (await this.userRepository.findOneByCpf(data.cpf)) {
      return E.left([{ field: "cpf", message: "Cpf already in use" }])
    }

    if (await this.userRepository.findOneByEmail(data.email)) {
      return E.left([{ field: "email", message: "Email already in use" }])
    }

    if (await this.userRepository.findOneByUsername(data.username)) {
      return E.left([{ field: "username", message: "Username already in use" }])
    }

    const user = new User(data)

    await this.userRepository.save(user)

    return E.right(user)
  }
}
