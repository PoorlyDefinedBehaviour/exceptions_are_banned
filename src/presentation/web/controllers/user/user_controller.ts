import { injectable, inject } from "tsyringe"
import { CreateUserUseCase } from "../../../../domain/usecases/create_user/create_user_use_case"
import { Request, Response } from "express"
import E from "fp-ts/lib/Either"

@injectable()
export class UserController {
  constructor(
    @inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  store = (request: Request, response: Response) =>
    this.createUserUseCase.execute(request.body).then(
      E.fold(
        errorMessages => response.status(400).json(errorMessages),
        user => response.status(201).json(user)
      )
    )
}
