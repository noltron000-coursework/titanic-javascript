// Takes in a data-array and a field-string.
// Returns a newly partitioned map.
const _dataMapper = (data, field) => {
	// This partition Object is a dictionary of key/list.
	// Actually, its not an Object, its a Map.
	// This allows its keys to be non-string typed.
	let partition = new Map()

	// Loop through each passenger and classify them.
	data.forEach((passenger) => {
		fieldValue = passenger[field]
		// Create a key/list if it does not exist in partition.
		if (partition.get(fieldValue) === undefined) {
			partition.set(fieldValue, new Array())
		}
		// Push passenger to associated key/list.
		partition.get(fieldValue).push(passenger)
	})
	// Remember: partition is a Map, not an ordinary Object.
	return partition
}

const split = (data, ...fields) => {
	// If there are any fields left, continue recursion...
	if (fields.length > 0) {
		// Retrieve the next field from the given list.
		// Shift removes the first field, then captures it.
		const field = fields.shift()
		// Partition data by declared field's value.
		// This makes a Map of partitioned Arrays.
		const map = _dataMapper(data, field)
		// Repeat on the Mapped Arrays with remaining fields.
		map.forEach((mapData, mapField) => {
			mapData = split(mapData, ...fields)
			map.set(mapField, mapData)
		})
		return map
	}
	return data
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
		const SeeData = new SolutionLogger(data)
	})
	.catch((error) => {
		// Explain error to browser.
		console.error(error.message)
		throw new Error('Problem handling JSON file!')
	})
}

fetchData()
