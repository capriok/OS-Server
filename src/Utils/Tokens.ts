import * as jwt from 'jsonwebtoken'
import User from '../Models/User'
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret'
const USER_SECRET = process.env.JWT_USER_SECRET || 'secret'

const options = { expiresIn: '7d', issuer: 'OS-Server' }
import { Response } from 'express'

export function createAccessToken(user: typeof User): string {
	return jwt.sign({ user }, ACCESS_SECRET, options)
}

export function createUserToken(user: typeof User): string {
	return jwt.sign({ user }, USER_SECRET, options)
}

export function sendUserCookie(res: Response, token: string) {
	res.cookie("OS_USERAUTH", token, {
		httpOnly: true,
		expires: new Date(Date.now() + (6.048e+8 * 4)),
		path: "/"
	});
};
