import resolver from '../Utils/Resolver'

import * as fs from 'fs'
import * as path from 'path'

import { Request, Response } from 'express'

interface Oversite {
	uid: number
	title: string
	site: string
	serverity: number
	category: string
	description: string
	proof: object[]
}

function imageToBase64(file) {
	const bitmap = fs.readFileSync(file);
	return Buffer.from(bitmap).toString('base64');
}

function base64ToBuffer(base64str): Buffer {
	return Buffer.from(base64str, 'base64')
}

export const get = (req: Request, res: Response): void => {
	// testing: get image from file system
	// prod: get base64 str from database

	// encode each image into base64 string
	// -done prior to db insertion
	const img1 = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev1.jpg'))
	const img2 = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev2.jpg'))

	// get images from database
	// encode each image into buffer
	// client will decode each buffer into base64 string for img tag src 
	const kylecaprio_dev1 = base64ToBuffer(img1)
	const kylecaprio_dev2 = base64ToBuffer(img2)

	const oversites: Oversite[] = [
		{
			uid: 17,
			site: 'www.kylecaprio.dev',
			title: 'Oversite 1',
			serverity: 5,
			category: 'Functionality Bug',
			description: 'Website is amazing but the stars are a bit much.',
			proof: [kylecaprio_dev1, kylecaprio_dev2]
		}, {
			uid: 20,
			site: 'www.hunterfoulk.com',
			title: 'Oversite 2',
			serverity: 2,
			category: 'Design flaw',
			description: 'Seems like this guy knows his stuff.',
			proof: []
		}, {
			uid: 17,
			site: 'www.github.com',
			title: 'Oversite 3',
			serverity: 4,
			category: 'Compatibility',
			description: 'Dark mode styles interfere with Chrome extension dark mode.',
			proof: []
		}
	]

	// out:
	// status
	// message
	// oversites

	resolver(res, 200, 'Oversites Returned', oversites)

}

export const post = (req: Request, res: Response): void => {
	const data = req.body

	console.log(req);
	console.log(data);


	// const oversites: Oversite = {
	// 	uid: null,
	// 	site: '',
	// 	category: '',
	// 	oversight: '',
	// 	screenshots: []
	// }

	// in:
	// uid
	// site
	// category
	// oversight
	// screenshots arr

	// For each image in screenshots arr
	// Turn image into base 64 string that can be stored in db
	// Or maybe send each screenshot induvidually on itteration to reduce final arr size
	// const imageEncoded = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev.jpg'));

	// route:
	// verify user 
	// verify data
	// post to db
	// err handing
	// data into resolver
	// res

	// out:
	// status code
	// message
	// data

	res.json(200)
}
