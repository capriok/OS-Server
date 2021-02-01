import { Router } from 'express'
import oversiteController from '../Controllers/Oversite-Controller'

export default function oversiteRouter(router: Router): void {
	router.route('/oversites')
		.get(oversiteController.get)
		.post(oversiteController.post)
}