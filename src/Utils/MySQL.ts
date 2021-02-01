import DB from '../Database/MySQL'
import { escape as esc } from 'mysql2'
import SQL, { SQLStatement } from 'sql-template-strings'

export const statements = {
	get: {
		allUsers: (
		): SQLStatement => SQL`
			SELECT * 
			FROM users
		`,
		login: (
			username: string
		): SQLStatement => SQL`
			SELECT uid, username, password, join_date
			FROM users
			WHERE username LIKE BINARY ${username}
		`,
		register: (
			username: string
		): SQLStatement => SQL`
			SELECT username
			FROM users
			WHERE username = ${username}
		`,
		refreshValidation: (
		): SQLStatement => SQL`
		
		`
	},
	post: {
		register: (
			username: string,
			hashedPass: string,
			joinDate: string
		): SQLStatement => SQL`
			INSERT INTO users
			(username, password, join_date)
			VALUES (${username}, ${hashedPass}, ${joinDate})
		`,
	},
	update: {},
	delete: {},
}

export default async function query(
	statement: SQLStatement
): Promise<any> {
	return new Promise((resolve, reject) => {
		DB.query(statement, (err, results) => {
			if (err) return reject(err)
			resolve(results)
		})
	})
}