// Takes a Data-Array and various fields of any type.
// The split function chops up the Array.
//
// == EXAMPLE ==
// Say you want to split up data by titanic passengers.
// But you want 4 categories:
// - men who survived
// - women who survived
// - men who died
// - women who died
//
// Pass in two fields, "gender" and "survival".
// If those fields are in the data, this does the rest.
const split = (data, ...fields) => {
	// If there are any fields left, make a recursion...
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

		// Finally, return the Map item.
		// The Map might have one of two structures:
		// - A set of Key:Array pairs.
		// - A set of Key:Map pairs.
		return map
	}

	// This is the base-case.
	// The data is of type Array if it reaches this.
	// There are no further children past the array.
	return data
}

// Takes in a Data-Array and a field of any type.
// The Array is some sort of Class or Object with keys.
// The Array is split up by its entries' field properties.
// This function returns the result of this computation.
const _dataMapper = (data, field) => {
	// This map is a kind of Object with Key:Array values.
	// Particularly, Maps allow Keys to be any type.
	const map = new Map()

	// Loop through each passenger and classify them.
	data.forEach((passenger) => {
		mapField = passenger[field]

		// Create a Key:Array pair if it does not yet exist.
		if (map.get(mapField) === undefined) {
			map.set(mapField, new Array())
		}

		// Push passenger to the associated Key:Array pair.
		map.get(mapField).push(passenger)
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
