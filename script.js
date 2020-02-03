// Get root tags
const body = document.querySelector('body')
const html = document.querySelector('html')
const container = document.querySelector('#container')

class Titanic {
	constructor(data) {
		this.data = data
	}

	filterData = (field, data = undefined) => {
		// Default to use the entire dataset.
		// This can be switched to use another set,
		// for example the result of another filter.
		if (data === undefined) {
			data = this.data
		}

		// This "filter" object is a dictionary of key/list.
		// A key/list is a self-contained set of filtered data.
		let filter = {}

		// Loop through each item and classify them.
		data.forEach((entry) => {
			if (!filter.hasOwnProperty(entry[field])) {
				// Create a key/list if it does not exist in filter.
				filter[entry[field]] = []
			}
			// Push entry to associated key/list.
			filter[entry[field]].push(entry)
		})

		return filter
	}
}

const fetchData = (parse) => {
	// Fetch data.
	fetch('./titanic-passengers.json')
	.then((response) => {
		// Jsonify fetched file.
		return response.json()
	})
	.then((json) => {
		// Clean json with the Passenger Class.
		let data = []
		json.forEach((entry) => {
			data.push(new Passenger(entry))
		})
		// Use the data in the Titanic Class.
		// Digest the data with a parse parameter function.
		parse(new Titanic(data))
	})
	.catch((error) => {
		// Explain error to browser.
		console.error(error.message)
		throw new Error('Problem handling JSON file!')
	})
}

fetchData(logSolutions)

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function handleData(data) {
	const betterData = data.map(({fields}) => {
		const el = document.createElement('div')
		fields.el = el
		fields.showFare = () => {
			el.style.height = fields.fare * 100
		}
		fields.showAge = () => {
			el.style.height = fields.age * 100
		}
		return fields
	})

	// Click fare button
	betterData.forEach((pessenger) => pessenger.showFare())

	console.log(data)
	const maxAge = data.reduce((acc, passenger) => {
		const age = passenger.fields.age !== undefined ? passenger.fields.age : 0
		return Math.max(acc, age)
	}, 0)
	console.log(maxAge)

	for (let item of data) {
		const {fields} = item
		const {fare, name, age, embarked, parch, pclass, sex, sibsp, survived} = fields

		const size = fare * 1
		const bgColor = survived === 'Yes' ? 'rgba(51, 208, 45, 0.125)' : 'rgba(195, 52, 52, 0.125)'
		const agePercent = age / maxAge

		const el = document.createElement('div')
		el.style.borderRadius = sex === 'female' ? '50% 50% 50% 0' : '50% 0 50% 50%'
		el.style.width = `${size}px` // Normalize and use %
		el.style.height = `${size}px`
		el.style.margin = '1px'
		el.style.position = 'absolute'
		el.style.border = '1px solid rgba(0, 0, 0, 0.61)'
		el.style.transform = 'translate(-50%, -50%)'
		el.style.left = `${100 * agePercent}%`
		el.style.top = '50%'
		el.style.backgroundColor = bgColor
		// el.style.backgroundColor = '#000'
		container.prepend(el)
	}
}

// Challenges
// - Add the date to the left of each bar
// - Make the bars draw vertically
// - Add the date below each bar
// - Change the color of each bar
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
