import User from '../Models/User'
import query, { statements as stmt } from '../Utils/MySQL'
import resolver from '../Utils/Resolver'

import { bcryptCompare, bcryptHash } from '../Utils/Bcrypt'
import * as jwt from 'jsonwebtoken'
import { createAccessToken, createUserToken, sendUserCookie } from '../Utils/Tokens'
const USER_SECRET = process.env.JWT_USER_SECRET || 'secret'

export const allUsers = (req, res) => {
	query(stmt.get.allUsers())
		.then(usersRes => {
			console.log(usersRes)
			resolver(res, 200, 'Users Returned', usersRes)
		})
		.catch(usersErr => {
			console.error(usersErr)
			resolver(res, 503, 'Database Error', {})
		})
}

export const login = (req, res) => {
	const { username, password } = req.body
	console.log({ body: req.body })
	query(stmt.get.login(username))
		.then(async (results) => {
			const userFound = results.length > 0

			if (!userFound) return resolver(res, 400, 'No Account Found')
			console.log({ userFound })

			const { uid: uid, join_date, password: hashedPass } = results[0]
			const passedComparison = await bcryptCompare(password, hashedPass)

			if (!passedComparison) return resolver(res, 401, 'Password Incorrect')
			console.log({ passedComparison })

			const uPayload = new User(uid, username, join_date)
			const userToken = createUserToken(uPayload)
			const accessToken = createAccessToken(uPayload)

			sendUserCookie(res, userToken)
			resolver(res, 200, 'Authenticated', { ...uPayload, au: { accessToken } })
		})
		.catch(error => {
			console.error(error)
			resolver(res, 503, 'Database Error')
		})
}

export const register = (req, res) => {
	const { username, password } = req.body
	console.log({ body: req.body })

	query(stmt.get.register(username))
		.then(async (getResults) => {
			const userFound = getResults.length > 0

			if (userFound) return resolver(res, 409, 'User Already Exists')
			console.log({ userFound })

			const hashedPass = await bcryptHash(password)
			const joinDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

			query(stmt.post.register(username, hashedPass, joinDate))
				.then((postResults) => {
					resolver(res, 200, 'Account Created', { uid: postResults.insertId })
				})
				.catch((postError) => {
					console.error(postError)
					resolver(res, 503, 'Database Error')
				})
		})
		.catch(userErr => {
			console.error(userErr)
			resolver(res, 503, 'Database Error')
		})
}

export const validateToken = (req, res) => {
	const userCookie = req.cookies
	const userToken = userCookie['OS_USERAUTH']

	if (Object.keys(userCookie).length <= 0) return resolver(res, 401, 'No Cookies', null)
	if (!userToken) return resolver(res, 401, 'No Token', null)
	console.log({ userToken: userToken.slice(0, 10) + '...' })

	jwt.verify(userToken, USER_SECRET, { issuer: 'OS-Server' }, (err, decoded: any) => {

		if (!decoded) return resolver(res, 401, 'Token Invalid', null)

		const { uid, username, join_date } = decoded.user
		const uPayload = new User(uid, username, join_date)
		const userToken = createUserToken(uPayload)
		const accessToken = createAccessToken(uPayload)

		console.log({ verifiedUid: uid })

		sendUserCookie(res, userToken)
		resolver(res, 200, 'User Token Decoded', { ...decoded, accessToken })
	})
}