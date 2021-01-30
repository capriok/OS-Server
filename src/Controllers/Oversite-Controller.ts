
interface Oversite {
	uid: number
	site: string
	title: string
	category: string
	description: string
	screenshots: object[]
}

import resolver from '../Utils/resolver'

import * as fs from 'fs'
import * as path from 'path'

function imageToBase64(file) {
	const bitmap = fs.readFileSync(file);
	return Buffer.from(bitmap).toString('base64');

}

function base64ToBuffer(base64str): Buffer {
	return Buffer.from(base64str, 'base64')
}

const oversiteController = {
	get: (req, res) => {

		// get image from file system for now
		// => get base64 str from database
		const img1 = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev1.jpg'));
		const img2 = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev2.jpg'));


		const kylecaprio_dev1 = base64ToBuffer(img1)
		const kylecaprio_dev2 = base64ToBuffer(img2)

		const oversites: Oversite[] = [
			{
				uid: 17,
				site: 'www.kylecaprio.dev',
				title: 'Oversite 1',
				category: 'Portfolio',
				description: 'Website is amazing but the stars are a bit much.',
				screenshots: [kylecaprio_dev1, kylecaprio_dev2]
			}, {
				uid: 20,
				site: 'www.hunterfoulk.com',
				title: 'Oversite 2',
				category: 'Portfolio',
				description: 'Seems like this guy knows his stuff. Shit designer tho.',
				screenshots: []
			}
		]

		res.send(resolver(200, 'Oversites Returned', oversites))

	},
	post: (req, res) => {
		console.log(req);

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
		const imageEncoded = imageToBase64(path.join(__dirname, '../', 'Assets/kylecaprio_dev.jpg'));

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
		// all new faults

		res.json({})
	}
}

export default oversiteController