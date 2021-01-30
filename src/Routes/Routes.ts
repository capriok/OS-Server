import { Router } from 'express'
const router = Router()

import userController from '../Controllers/User-Controller'
import oversiteController from '../Controllers/Oversite-Controller'

router.get('/users', userController.allUsers)

router.get('/token-verify:', userController.tokenVerify)

router.get('/user:', userController.login)
router.post('/user', userController.create)
router.use('/oversites', oversiteController.get)
router.use('/oversite', oversiteController.post)


export default router