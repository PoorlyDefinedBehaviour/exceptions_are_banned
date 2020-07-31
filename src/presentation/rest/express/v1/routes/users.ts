import { Router } from "express"
import { container } from "tsyringe"
import { ExpressUserController } from "../controllers/user/user_controller"

const router = Router()

const userController = container.resolve(ExpressUserController)

router.post("users", userController.store)
