// Takes in a data-array and a field-string.
// Returns a newly partitioned map.
const _partitionHelper = (data, field) => {
	console.warn(data)
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

const partitionData = (data, ...fields) => {
	// if there are any fields left
	if (fields.length > 0) {
		// retrieve the next field
		const field = fields.shift()
		// partition data by field's value
		data = _partitionHelper(data, field)
		// repeat on partitioned data
		return partitionData(data, ...fields)
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
