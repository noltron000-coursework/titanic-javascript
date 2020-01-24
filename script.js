// Get root tags
const body = document.querySelector('body')
const html = document.querySelector('html')
const container = document.querySelector('#container')

// Data get!
fetch('./titanic-passengers.json')
.then(res => res.json())
.then(json => handleData(json))
.catch(err => console.log(err.message))

class Titanic {
	constructor(json) {
		this.data = json
	}

	// Question 1
	// Get data from the first passenger in the list
	getFirstPassenger = () => {
		return
	}

	// Question 2
	// How many total passengers?
	getPassengerCount = () => {
		// Get the length of the list
		return
	}

	// Question 3
	// How many survived?
	getPassengerSurvive = () => {
		// Loop over the list and count survived = Yes/No
		return
	}

	// Question 4
	// How many passenger classes?
	getPassengerClasses = () => {
		// Loop over the list and look for each unique value
		// You can use an object or a set for this
		return
	}

	// Question 5
	// How many passengers in each class?
	getPassengersInClass = () => {
		// Loop over the list and count the number
		// of times each unique value appears
		// Use an object where the key is passenger class
		return
	}

	// Question 6
	// How many died in each class?
	getPassengerClassSurvival = () => {
		// Get all of the ages from the Titanic Dataset
		// Filter data points where the age is missing
		return
	}

	// Question 7
	// How many passengers embarked from Queenstown?
	getTownPassengers = () => {
		return
	}

	// Question 8
	// How many people traveled with a nanny?
	getKidsWithNanny = () => {
		return
	}

	// Question 9
	// Find the min and max age.
	getMinAge = () => {
		return
	}

	// Question 10
	// Find min and max fare.
	getMaxAge = () => {
		return
	}

	// Question 11
	// How many siblings were there?
	getSiblings = () => {
		return
	}

	// Question 12
	// What is the survival rate of siblings vs only children?
	getSiblingSurvival = () => {
		return
	}

	// Question 13
	// How many ages were estimated?
	getNumAges = () => {
		return
	}
}

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
