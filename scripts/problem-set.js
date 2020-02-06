class SolutionLogger extends Dataset {
	constructor(data) {
		super(data)
		this.problems  = [
			this.problem01,
			this.problem02,
			this.problem03,
			this.problem04,
			this.problem05,
			this.problem06,
			this.problem07,
			this.problem08,
			this.problem09,
			this.problem10,
			this.problem11,
			this.problem12,
			this.problem13,
			this.problem14,
		]
		this.logSolutions()
	}

	logSolutions = () => {
		this.problems.forEach((problem) => {
			const [prompt, solution] = problem()
			console.log(prompt)
			console.info(solution)
		})
	}

	problem01 = () => {
		const prompt = (
			'PROBLEM #1:\n' +
			'Retrieve the first passanger\'s data.\n'
		)

		// Just call the Array's first index-key.
		const solution = this.data[0]

		return [prompt, solution]
	}

	problem02 = () => {
		const prompt = (
			'PROBLEM #2:\n' +
			'Retrieve the length of the dataset.\n'
		)

		// Just call the Array.length property.
		const solution = this.data.length

		return [prompt, solution]
	}

	problem03 = () => {
		const prompt = (
			'PROBLEM #3:\n' +
			'How many survived on the titanic?\n'
		)

		// Split data by each passanger's survival.
		let solution = split(this.data, 'survived')
		// Count those that did survive (true).
		solution = solution.get(true).length

		return [prompt, solution]
	}

	problem04 = () => {
		const prompt = (
			'PROBLEM #4:\n' +
			'How many passenger classes exist?\n'
		)

		// Split data by each passanger's class.
		let solution = split(this.data, 'class')
		// Count the number of keys in the map.
		solution = [...solution.keys()].length

		return [prompt, solution]
	}

	problem05 = () => {
		const prompt = (
			'PROBLEM #5:\n' +
			'How many passengers are in each class?\n'
		)

		// Split data by each passanger's class.
		const solution = split(this.data, 'class')
		// Count the number of passengers in each child array.
		// Then, reset the property to the count-value.
		solution.forEach((mapData, mapField) => {
			solution.set(mapField, mapData.length)
		})

		return [prompt, solution]
	}

	problem06 = () => {
		const prompt = (
			'PROBLEM #6:\n' +
			'How many passengers died in each class?\n'
		)

		// Split data first by class, and then by survival.
		const solution = split(this.data, 'class', 'survived')
		// Count the number of deaths in each child Array.
		// Then, reset the property to the count-value.
		solution.forEach((mapData, mapField) => {
			solution.set(mapField, mapData.get(false).length)
		})

		return [prompt, solution]
	}

	problem07 = () => {
		const prompt = (
			'PROBLEM #7:\n' +
			'What are all of the ages in the dataset?\n'
		)

		// Split data by each passanger's age.
		let solution = split(this.data, 'age')
		// Count the number of keys in the map.
		solution = new Set([...solution.keys()])

		return [prompt, solution]
	}

	problem08 = () => {
		const prompt = (
			'PROBLEM #8:\n' +
			'How many passengers embarked from Queenstown?\n'
		)

		// Split data by each passanger's embarked city.
		let solution = split(this.data, 'embarked')
		// Use the "Q" key from the map and count entries.
		solution = solution.get('Q').length

		return [prompt, solution]
	}

	problem09 = () => {
		const prompt = (
			'PROBLEM #9:\n' +
			'How many passengers traveled with a nanny?\n'
		)

		let solution = this.data
		// Get all children under 18.
		.filter(passenger => passenger['age'] < 18)
		// Then, get all children without a parent.
		.filter(passenger => passenger['numChildren'] === 0)
		// Just count the results!
		.length

		return [prompt, solution]
	}

	problem10 = () => {
		const prompt = (
			'PROBLEM #10:\n' +
			'What are the youngest and oldest passengers\' age?\n'
		)

		let solution = this.data
		// Get all ages in the dataset.
		.map(passenger => passenger.age)
		// Ensure those ages are defined.
		.filter(age => age !== undefined)

		// Compute the min and max of the Array.
		solution = [
			Math.min(...solution),
			Math.max(...solution)
		]

		return [prompt, solution]
	}

	problem11 = () => {
		const prompt = (
			'PROBLEM #11:\n' +
			'What are the min and max fares in the dataset?\n'
		)

		let solution = this.data
		// Get all fares in the dataset.
		.map(passenger => passenger.fare)
		// Ensure those fares are defined.
		.filter(fare => fare !== undefined)

		// Compute the min and max of the Array.
		solution = [
			Math.min(...solution),
			Math.max(...solution)
		]

		return [prompt, solution]
	}

	problem12 = () => {
		const prompt = (
			'PROBLEM #12:\n' +
			'How many siblings are there?\n'
		)

		const solution = this.data
		// Filter for passengers who have one or more siblings.
		.filter(passenger => passenger.numSiblings > 0)
		// Count how many passengers meet this criteria.
		.length

		return [prompt, solution]
	}

	problem13 = () => {
		const prompt = (
			'PROBLEM #13:\n' +
			'Get survival rates of those who have siblings\n' +
			'versus those who are a only-child.\n'
		)

		// Create solutions map.
		let solution = new Map()

		// Passangers with siblings.
		const hasSiblings = this.data
		.filter(passenger => passenger.numSiblings > 0)

		// Passengers without siblings.
		const noSiblings = this.data
		.filter(passenger => passenger.numSiblings === 0)

		// Split data for easier digestion.
		solution.set(true, split(hasSiblings, 'survived'))
		solution.set(false, split(noSiblings, 'survived'))

		// Calculate survival rate for those with a sibling.
		const hasSibRate = (
			solution.get(true).get(true).length / (
				solution.get(true).get(true).length
				+ solution.get(true).get(false).length
			)
		)

		// Calculate survival rate for those without a sibling.
		const noSibRate = (
			solution.get(false).get(true).length / (
				solution.get(false).get(true).length
				+ solution.get(false).get(false).length
			)
		)

		// Set new rates to Map-Object.
		solution.set(true, hasSibRate)
		solution.set(false, noSibRate)

		return [prompt, solution]
	}

	problem14 = () => {
		const prompt = (
			'PROBLEM #14:\n' +
			'Count how many unique ages exist in the dataset.\n'
		)

		// Split data by each passanger's age.
		let solution = split(this.data, 'age')
		// Count the number of keys in the map.
		solution = [...solution.keys()].length

		return [prompt, solution]
	}
}
