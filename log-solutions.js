const logSolutions = (T) => {
	console.log(
		'PROBLEM #1:\n' +
		'Retrieve the first passanger\'s data.\n'
	)
	console.info(
		T.data[0]
	)


	console.log(
		'PROBLEM #2:\n' +
		'Retrieve the length of the dataset.\n'
	)
	console.info(
		T.data.length
	)


	console.log(
		'PROBLEM #3:\n' +
		'How many survived on the titanic?\n'
	)
	console.info(
		T.data
		// Filter for passengers who survived.
		.filter(passenger => passenger['survived'] === true)
		// Then, check how many entries there are.
		.length
	)


	console.log(
		'PROBLEM #4:\n' +
		'How many passenger classes exist?\n'
	)
	console.info(
		Object.keys(T.filterData('class')).length
	)


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #5:\n' +
			'How many passengers are in each class?\n'
		)
		// Create a filtered dictionary of key/data pairs.
		let passByClass = T.filterData('class')
		for (const key in passByClass) {
			// Replace data-lists with their length.
			passByClass[key] = passByClass[key].length
		}
		console.info(
			passByClass
		)
	}


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #6:\n' +
			'How many passengers died in each class?\n'
		)
		// Create a filtered dictionary of key/data pairs.
		// We want to first filter by class.
		let passByClass = T.filterData('class')
		for (const key in passByClass) {
			const data = passByClass[key]
			// Further filter each class-data with survival rates.
			const passBySurvival = T.filterData('survived', data)
			// We only want those who died; use the "false" key.
			const fatalities = passBySurvival[false]
			// Replace data-lists with the number of fatalities.
			passByClass[key] = fatalities.length
		}
		console.info(
			passByClass
		)
	}


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #7:\n' +
			'What are all of the ages in the dataset?\n'
		)
		// Create a filtered dictionary of key/data pairs.
		let passByAge = T.filterData('age')
		for (const key in passByAge) {
			const data = passByAge[key]
			// Replace data-lists with the count of each age.
			passByAge[key] = data.length
		}
		console.info(
			passByAge
		)
	}


	console.log(
		'PROBLEM #8:\n' +
		'How many passengers embarked from Queenstown?\n'
	)
	console.info(
		T.data
		// Filter for passengers who embarked from "Q".
		.filter(passenger => passenger['embarked'] === 'Q')
		// Then, check how many entries there are.
		.length
	)


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #9:\n' +
			'How many passengers traveled with a nanny?\n'
		)

		let nannyChildren = T.data
		// Get all children under 18.
		.filter(passenger => passenger['age'] < 18)
		// Then, get all children without a parent.
		.filter(passenger => passenger['numChildren'] === 0)

		console.info(
			nannyChildren.length
		)
	}


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #10:\n' +
			'What are the youngest and oldest passengers\' age?\n'
		)

		const ages = T.data
		// Get all ages in the dataset.
		.map(passenger => passenger.age)
		// Ensure those ages are defined.
		.filter(age => age !== undefined)

		console.info(
			Math.min(...ages),
			Math.max(...ages)
		)
	}


	{ // Block Scoped to remove unneeded variables after.
		console.log(
			'PROBLEM #11:\n' +
			'What are the min and max fares in the dataset?\n'
		)

		const fares = T.data
		// Get all fares in the dataset.
		.map(passenger => passenger.fare)
		// Ensure those fares are defined.
		.filter(fare => fare !== undefined)

		console.info(
			Math.min(...fares),
			Math.max(...fares)
		)
	}


	console.log(
		'PROBLEM #12:\n' +
		'How many siblings are there?\n'
	)
	console.info(
		T.data
		// Filter for passengers who have one or more siblings.
		.filter(passenger => passenger.numSiblings > 0)
		// Count how many passengers meet this criteria.
		.length
	)


	{ // Block Scoped to remove unneeded variables after.
		console.log(
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
	}

	console.log(
		'PROBLEM #14:\n' +
		'Count how many unique ages exist in the dataset.\n'
	)
	console.info(
		Object.keys(T.filterData('age')).length
	)
}
