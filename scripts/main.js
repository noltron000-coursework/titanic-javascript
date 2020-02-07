// Takes in a Data-Set and a field of any type.
// The Set is some sort of Class or Object with keys.
// The Set is split up by its entries' field properties.
// This function returns the result of this computation.
const dataMapper = (data, field) => {
	// This map is a kind of Object with Key:Set values.
	// Particularly, Maps allow Keys to be any type.
	const map = new Map()

	// Loop through each passenger and classify them.
	data.forEach((passenger) => {
		mapField = passenger[field]

		// Create a Key:Set pair if it does not yet exist.
		if (map.get(mapField) === undefined) {
			map.set(mapField, new Set())
		}

		// Push passenger to the associated Key:Set pair.
		map.get(mapField).add(passenger)
	})
	return map
}

const fetchData = () => {
	// Fetch data.
	fetch('./titanic-passengers.json')
	.then((response) => {
		// Jsonify fetched file.
		return response.json()
	})
	.then((json) => {
		// Clean json with the Passenger Class.
		let data = new Array()
		json.forEach((entry) => {
			data.push(new Passenger(entry))
		})
		// Use the data in the Titanic Class.
		// Digest the dataset with a "manipulate" function.
		const SeeData = new ProblemSolver(data)
	})
	.catch((error) => {
		// Explain error to browser.
		console.error(error.message)
		throw new Error('Problem handling JSON file!')
	})
}

fetchData()
