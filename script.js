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
