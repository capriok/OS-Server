interface User {
	uid: number
	username: string
	join_date: string
}

export default function User(uid: number, username: string, join_date: string): void {
	this.uid = uid
	this.username = username
	this.join_date = join_date
}
