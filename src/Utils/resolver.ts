import { Response } from 'express'

export default function resolver(
	res: Response,
	code: number,
	message: string = '',
	data: any = {}
) {
	message.length > 0 && console.log('Resolver: ', message)
	res.json({
		status: code,
		message: message,
		data: data
	})
}