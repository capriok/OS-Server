import User from '../Models/User'

import resolver from '../Utils/resolver'
import query from '../Utils/query'

import * as bcrypt from 'bcrypt'
const ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10

import * as jwt from 'jsonwebtoken'
const SECRET = process.env.JWT_SECRET || 'secret'

const bcryptHash = async (password, rounds = ROUNDS) => {
	return await new Promise((resolve, reject) => {
		bcrypt.hash(password, rounds, (err, hash) => {
			if (err) reject(err)
			resolve(hash)
		})
	})
}
const bcryptCompare = async (pass, hash) => {
	return await new Promise((resolve, reject) => {
		bcrypt.compare(pass, hash, (err, hash) => {
			if (err) reject(err)
			resolve(hash)
		})
	})
}

const userController = {
	allUsers: (req, res) => {
		query('SELECT * FROM users', [])
			.then(usersRes => {
				console.log(usersRes)
				res.json(resolver(200, 'Users Returned', usersRes))
			})
			.catch(usersErr => {
				console.error(usersErr)
				res.json(resolver(503, 'Database Error', {}))
			})
	},
	login: (req, res) => {
		const { username, password } = req.query
		console.log({ params: req.query })

		query('SELECT uid, username, password, join_date FROM users WHERE username LIKE BINARY ?', [username],)
			.then(async (userRes) => {
				const userFound = userRes.length > 0
				console.log({ userFound })

				if (userFound) {
					const { uid: uid, join_date } = userRes[0]
					console.log(userRes[0]);

					const hashedPass = userRes[0].password
					const passedComparison = await bcryptCompare(password, hashedPass)
					console.log({ passComparison: passedComparison })

					if (passedComparison) {
						console.log('Step: Loggin in...')
						const userPreToken = {
							uid, username, join_date
						}
						const token = jwt.sign(userPreToken, SECRET, { issuer: 'OS-Server', expiresIn: '1d' })
						console.log({ token: token ? true : false })
						const userSigned = new User(uid, username, token, join_date)
						res.json(resolver(200, 'Authenticated', { ...userSigned }))
					} else {
						res.json(resolver(401, 'Password Incorrect'))
					}
				} else {
					res.json(resolver(400, 'No Account Found'))
				}
			})
			.catch(userErr => {
				console.error(userErr)
				res.json(resolver(503, 'Database Error'))
			})
	},
	create: (req, res) => {
		const { username, password } = req.body
		console.log({ body: req.body })

		query('SELECT username FROM users WHERE username = ?', [username])
			.then(async (userRes) => {
				const userFound = userRes.length > 0
				console.log({ userFound })

				if (userFound) {
					res.json(resolver(409, 'User Already Exists'))
				} else {
					console.log('Step: Creating Acocunt...')
					const hashedPass = await bcryptHash(password)
					console.log({ passwordHashed: hashedPass ? true : false })
					const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
					query('INSERT INTO users (username, password, join_date) VALUES (?, ?, ?)', [username, hashedPass, date])
						.then((insertRes) => {
							res.json(resolver(200, 'Account Created', { uid: insertRes.insertId }))
						})
						.catch((insertErr) => {
							console.error(insertErr)
							res.json(resolver(503, 'Database Error'))
						})
				}
			})
			.catch(userErr => {
				console.error(userErr)
				res.json(resolver(503, 'Database Error'))
			})
	},
	tokenVerify: (req, res) => {
		const { token } = req.query

		console.log(token);

		jwt.verify(token, SECRET, (err, decoded) => {
			console.log(decoded)
			if (decoded) {
				res.json(resolver(200, 'Token Decoded', { ...decoded, token }))
			} else {
				res.json(resolver(401, 'Token Invalid', null))
			}
		});

	}
}

export default userController