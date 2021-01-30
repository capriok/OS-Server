import DB from '../Database/MySQL'

export default async function query(statement: string, vars?: string[]): Promise<any> {
	return new Promise((resolve, reject) => {
		DB.query(statement, vars, (err, results: any[]) => {
			if (err) return reject(err)
			resolve(results)
		})
	})
}