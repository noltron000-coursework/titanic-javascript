class SolutionLogger extends Visualizer {
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

		// ...
		const solution = this.data[0]

		return [prompt, solution]
	}

	problem02 = () => {
		const prompt = (
			'PROBLEM #2:\n' +
			'Retrieve the length of the dataset.\n'
		)

		// ...
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

		// ...
		const solution = split(this.data, 'class').keys()
		// TODO: just count the number of keys in the map!

		return [prompt, solution]
	}

	problem05 = () => {
		const prompt = (
			'PROBLEM #5:\n' +
			'How many passengers are in each class?\n'
		)

		// ...
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

		// Create a filtered dictionary of key/data pairs.
		const solution = split(this.data, 'age').keys()
		// TODO: count the number of unique ages.
		// NOTE: also, this *could* just use a set of keys...
		// This could be filtered into 5-year age buckets too.
		// Replace data-lists with the count of each age.

		return [prompt, solution]
	}

} // !Delete this line when the block-comment is released!

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

	problem08 = () => {
		const prompt = (
			'PROBLEM #8:\n' +
			'How many passengers embarked from Queenstown?\n'
		)

		let partition = split(this.data, 'embarked')
		// TODO: use the "Q" key from the map and count entries.
		const solution = partition

		return [prompt, solution]
	}


	problem09 = () => {
		const prompt = (
			'PROBLEM #9:\n' +
			'How many passengers traveled with a nanny?\n'
		)

		let nannyChildren = dataset
		// Get all children under 18.
		.filter(passenger => passenger['age'] < 18)
		// Then, get all children without a parent.
		.filter(passenger => passenger['numChildren'] === 0)

		console.info(
			nannyChildren.length
		)
		const solution = partition

		return [prompt, solution]
	}

	problem10 = () => {
		const prompt = (
			'PROBLEM #10:\n' +
			'What are the youngest and oldest passengers\' age?\n'
		)

		const ages = dataset
		// Get all ages in the dataset.
		.map(passenger => passenger.age)
		// Ensure those ages are defined.
		.filter(age => age !== undefined)

		console.info(
			Math.min(...ages),
			Math.max(...ages)
		)

		return [prompt, solution]
	}

	problem11 = () => {
		const problem = (
			'PROBLEM #11:\n' +
			'What are the min and max fares in the dataset?\n'
		)

		const fares = dataset
		// Get all fares in the dataset.
		.map(passenger => passenger.fare)
		// Ensure those fares are defined.
		.filter(fare => fare !== undefined)

		console.info(
			Math.min(...fares),
			Math.max(...fares)
		)

		return [prompt, solution]
	}

	problem12 = () => {
		const prompt = (
			'PROBLEM #12:\n' +
			'How many siblings are there?\n'
		)
		console.info(
			dataset
			// Filter for passengers who have one or more siblings.
			.filter(passenger => passenger.numSiblings > 0)
			// Count how many passengers meet this criteria.
			.length
		)

		return [prompt, solution]
	}

	problem13 = () => {
		const prompt = (
			'PROBLEM #13:\n' +
			'Get survival rates of siblings vs only-children.\n'
		)
		const passBySiblings = T.filterData('numSiblings')
		for (const key in passBySiblings) {
			const data = passBySiblings[key]
			// Further filter each class-data with survival rates.
			const passBySurvival = T.filterData('survived', data)
			// We only want the survival rate.
			// The rate of survival is true / total
			let survivors = passBySurvival[true]
			if (survivors !== undefined) {
				survivors = survivors.length
			} else {
				survivors = 0
			}
			const total = passBySiblings[key].length
			const rate = survivors / total
			// Replace data-lists with the rate of fatality.
			passBySiblings[key] = rate
		}
		console.info(
			passBySiblings
		)

		return [prompt, solution]
	}

	problem14 = () => {
		const prompt = (
			'PROBLEM #14:\n' +
			'Count how many unique ages exist in the dataset.\n'
		)
		console.info(
			Object.keys(T.filterData('age')).length
		)

		return [prompt, solution]
	}
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
