import * as mysql from 'mysql2'

const PASS = process.env.DB_PASS

const connection = mysql.createConnection({
	user: 'caprio',
	password: PASS,
	host: 'localhost',
	database: 'oversites',
	port: 3306,
	multipleStatements: true
})

export default connection