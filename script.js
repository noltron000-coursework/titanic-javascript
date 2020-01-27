// Get root tags
const body = document.querySelector('body')
const html = document.querySelector('html')
const container = document.querySelector('#container')

// Define new class for passengers.
// The inputs are pretty ugly so this will fix it up.
class Passenger {
	// A row of data in JSON represents a passenger.
	// A passanger is just a person with several qualities,
	// including their ticket purchase and personal info.
	constructor(entry) {
		// Cleaned metadata goes here.
		this.dataID = entry['datasetid']
		this.ticketID = entry['fields']['ticket']
		this.passengerID = entry['fields']['passengerid']
		this.recordID = entry['recordid']
		this.recordTime = entry['record_timestamp']

		// Passenger - personal information.
		this.name = entry['fields']['name']
		this.age = entry['fields']['age']
		this.sex = entry['fields']['sex']
		// This field includes both siblings & spouses.
		this.numSiblings = entry['fields']['sibsp']
		// This field includes both children & parents.
		this.numChildren = entry['fields']['parch']
		// This field is a string where it should be boolean.
		this.survived = this._cleanSurvived(entry)
		
		// Passenger - ticket information.
		this.fare = entry['fields']['fare']
		this.class = entry['fields']['pclass']
		this.cabin = entry['fields']['cabin']
		this.embarked = entry['fields']['embarked']
	}

	_cleanSurvived = (entry) => {
		// This internal function cleans the "survived" field.
		switch (entry['fields']['survived']) {
			case 'Yes':
				return true
			case 'No':
				return false
			default:
				return null
		}
	}
}

class Titanic {
	constructor() {
		// Set variables
		this.data = []

		// Fetch data.
		fetch('./titanic-passengers.json')
		.then((response) => {
			// Jsonify fetched file.
			return response.json()
		})
		.then((json) => {
			// Clean json with passenger class.
			console.log(json)
			json.forEach((entry) => {
				this.data.push(new Passenger(entry))
			})
		})
		.catch((error) => {
			// Explain error to browser.
			console.error(error.message)
			throw new Error('Problem handling JSON file!')
		})
	}

	// *Question 1*
	// Get data from the first passenger in the list.
	getFirstPassenger = () => {
		return this.data[0]
	}

	// *Question 2*
	// How many total passengers?
	countPassengers = () => {
		// Get the length of the list.
		return this.data.length
	}

	// Get all passengers who survived, died, and undefined.
	getPassangerSurvival = (data = undefined) => {
		// Allow to use this as a helper function.
		if (data === undefined) {
			data = this.data
		}

		// Create base dictionary.
		let survival = {
			'lived': [],
			'died': [],
			'unknown': [],
		}

		// Loop through each item and classify.
		data.forEach((entry) => {
			if (entry.survived === true) {
				survival['lived'].append(entry)
			} else if (entry.survived === false) {
				survival['died'].append(entry)
			} else {
				survival['unknown'].append(entry)
			}
		})

		// Return the object.
		return survival
	}

	// Get all passangers and classify them by their...class.
	getPassengersInClass = (data = undefined) => {
		// Allow to use this as a helper function.
		if (data === undefined) {
			data = this.data
		}
		// Set various variables.
		let classes = dict()

		// Loop through each item and classify.
		data.forEach((entry) => {
			if (classes.has(entry['class'])) {
				classes[entry['class']].append(entry)
			} else {
				classes[entry['class']] = []
				classes[entry['class']].append(entry)
			}
		})

		// Return the object.
		return classes
	}

	// *Question 3*
	// How many survived?
	countPassengersWhoLived = () => {
		return this.getPassengerSurvival()['lived'].length
	}

	// *Question 4*
	// How many passenger classes?
	countPassengerClasses = () => {
		return this.getPassengersInClass().length
		
	}

	// *Question 5*
	// How many passengers in each class?
	countPassengersInClass = () => {
		// Declare variables
		let counter = dict()
		const pClasses = this.getPassengersInClass()

		// Loop through each class section
		pClasses.forEach((entry) => {
			// Get the number of items in the section
			counter[entry] = pClasses[entry].length
		})

		return counter
	}

	// *Question 6*
	// How many died in each class?
	getPassengerClassSurvival = () => {
		// Declare variables
		let histogram = dict()
		const pClasses = this.getPassengersInClasses()

		// Loop through each class section
		pClasses.forEach((entry) => {
			// Get the data in the class section.
			const section = pClasses[entry]
			// Get the number of lives and deaths in the section.
			const sectionData = this.getPassengerSurvival(section)
			// Set the number of deaths found.
			histogram[entry] = sectionData['died'].length
		})

		return histogram
	}

	// *Question 7*
	// Get all of the ages from the Titanic Dataset.
	listAllAges = (data = undefined) => {
		// Allow to use this as a helper function.
		if (data === undefined) {
			data = this.data
		}

		// Set variables
		let ages = []

		// Filter data points where the age is missing.
		data.forEach((entry) => {
			if ('age' in entry) {
				ages.append(entry['age'])
			}
		})

		return ages
	}

	// Get all of the fares.
	listAllFares = (data = undefined) => {
		// Allow to use this as a helper function.
		if (data === undefined) {
			data = this.data
		}

		// Set variables
		let fares = []

		// Filter data points where the fare is missing.
		data.forEach((entry) => {
			if ('fare' in entry) {
				ages.append(entry['fare'])
			}
		})

		return fares
	}

	// *Question 8*
	// How many passengers embarked from Queenstown?
	countTownPassengers = () => {
		let counter = 0
		this.data.forEach((entry) => {
			if (entry['embarked'] === 'Q') {
				counter += 1
			}
		})
		return counter
	}

	// *Question 9*
	// How many people traveled with a nanny?
	countKidsWithNanny = () => {
		let counter = 0
		this.data.forEach((entry) => {
			if (entry['age'] < 18 && numChildren === 0) {
				counter += 1
			}
		})
		return counter
	}

	// *Question 10*
	// Find the min and max age.
	getMinAge = () => {
		return Math.max(this.listAllAges())
	}

	// *Question 11*
	// Find min and max fare.
	getMaxAge = () => {
		fares = this.listAllFares()
		max = Math.max(fares)
		min = Math.min(fares)
		return [min, max]
	}

	// *Question 12*
	// How many siblings were there?
	countSiblings = () => {
		let counter = 0
		this.data.forEach((entry) => {
			if (entry['sibsp'] > 0) {
				counter += 1
			}
		})
		return counter
	}
/* *********************************************************
	// *Question 13*
	// What is the survival rate of siblings vs only children?
	getSiblingSurvival = () => {
		return
	}
********************************************************* */

	// *Question 14*
	// How many ages were estimated?
	getNumAges = () => {
		let ages = this.listAllAges()
		ages = ages.splice(0, ages.length, ...(new Set(array)))
		return ages.length
	}
}

const T = new Titanic()

/* *********************************************************
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
********************************************************* */
