import * as bcrypt from 'bcrypt'
const ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10

export const bcryptHash = async (password: string): Promise<string> => {
	return await new Promise((resolve, reject) => {
		bcrypt.hash(password, ROUNDS, (err, hash) => {
			if (err) reject(err)
			resolve(hash)
		})
	})
}

export const bcryptCompare = async (pass: string, hash: string): Promise<boolean> => {
	return await new Promise((resolve, reject) => {
		bcrypt.compare(pass, hash, (err, hash) => {
			if (err) reject(err)
			resolve(hash)
		})
	})
}