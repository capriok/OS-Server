import { Router as R } from 'express'

import userRouter from './User-Router'
import oversiteRouter from './Oversite-Router'

export default function Router(router: R): R {
	userRouter(router)
	oversiteRouter(router)
	return router
};