import { injectable, inject } from "tsyringe"
import { IUserRepository } from "../../repositories/user_repository"
import { CreateUserDTO } from "./create_user_dto"
import { User, Gender } from "../../entities/user_entity"
import * as E from "fp-ts/lib/Either"
import { Failure } from "../../../core/interfaces/failure"
import * as R from "ramda"
import * as yup from "yup"

const schema = yup.object().shape({
  cpf: yup.string().required("O cpf deve ser informado"),
  username: yup
    .string()
    .min(5, "O username deve conter no mínimo 5 caracteres")
    .required("O username deve ser informado"),
  email: yup
    .string()
    .email("O email deve ser válido")
    .required("O email deve ser informado"),
  country: yup.string().required("O país deve ser informado"),
  gender: yup
    .mixed()
    .oneOf([Gender.male, Gender.female, Gender.other])
    .required("O gênero deve ser informado"),
})

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  execute = async (data: CreateUserDTO): Promise<E.Either<Failure[], User>> => {
    const errors = await schema.validate(data, {
      abortEarly: false,
    })
    // @TODO: Validate fields
    if (await this.userRepository.findOneByCpf(data.cpf)) {
      return E.left([
        { type: "validation", field: "cpf", message: "Cpf already in use" },
      ])
    }

    if (await this.userRepository.findOneByEmail(data.email)) {
      return E.left([
        { type: "validation", field: "email", message: "Email already in use" },
      ])
    }

    if (await this.userRepository.findOneByUsername(data.username)) {
      return E.left([
        {
          type: "validation",
          field: "username",
          message: "Username already in use",
        },
      ])
    }

    const user = new User(data)

    return this.userRepository.save(user).then(
      E.bimap(
        () => [
          {
            type: "unknown",
            field: "unknown",
            message: "Failed to create user",
          },
        ],
        R.identity
      )
    )
  }
}
