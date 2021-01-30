export default function resolver(code: number, message: string = '', data: any = {}) {
	console.log('Resolver: ', message)
	return {
		status: code,
		message: message,
		data: data
	}
}