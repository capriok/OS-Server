import { Router } from 'express'
import * as userController from '../Controllers/User-Controller'

export default function userRouter(router: Router): void {
	router.route('/users')
		.get(userController.allUsers)

	router.route('/login')
		.post(userController.login)

	router.route('/register')
		.post(userController.register)

	router.route('/user-auth')
		.get(userController.validateToken)
}