class Visualizer extends Dataset{
	constructor(data) {
		super(data)
		this.renderNodes()
		this.filterByGender()
		this.filterBySurvival()
	}

	renderNodes () {
		const parent = document.getElementById('container')
		this.divs.forEach((div) => {
			parent.appendChild(div)
		})
	}

	clearFilters () {
		[...this.divs].forEach((div) => {
			div.className = ''
		})
	}

	filterByGender () {
		const men = new Set([...this.data]
		.filter((passenger) => {
			return passenger.sex == 'male'
		}))

		const women = new Set([...this.data]
		.filter((passenger) => {
			return passenger.sex == 'female'
		}))

		this.divify(...men).forEach((div) => {
			div.classList.add('male')
		})

		this.divify(...women).forEach((div) => {
			div.classList.add('female')
		})
	}

	filterBySurvival () {
		const survived = new Set([...this.data]
		.filter((passenger) => {
			return passenger.survived
		}))

		const deceased = new Set([...this.data]
		.filter((passenger) => {
			return !passenger.survived
		}))

		this.divify(...survived).forEach((div) => {
			div.classList.add('survived')
		})

		this.divify(...deceased).forEach((div) => {
			div.classList.add('deceased')
		})
	}

	// filterBySurvival () {
	// 	const died = [...this.divs]
	// 	.filter((div, index) => {
	// 		const passenger = this.data[index]
	// 		return passenger.survived == true
	// 	})

	// 	const survived = [...this.divs]
	// 	.filter((div, index) => {
	// 		const id = div.getAttribute
	// 		const passenger = this.data[index]
	// 		return passenger.survived == false
	// 	})

	// 	died.forEach((div) => {
	// 		div.classList.add('died')
	// 	})

	// 	survived.forEach((div) => {
	// 		div.classList.add('survived')
	// 	})
	// }
}


/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
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
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
