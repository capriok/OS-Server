import { Router } from 'express'
import * as oversiteController from '../Controllers/Oversite-Controller'

export default function oversiteRouter(router: Router): void {
	router.route('/oversites')
		.get(oversiteController.get)

	router.route('/oversite')
		.post(oversiteController.post)
}