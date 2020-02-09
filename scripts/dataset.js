class Dataset {
	constructor(data) {
		this.data = new Set(data)
		this.divs = new Set([...this.data].map((passenger) => {
			const index = passenger['passengerID']
			const div = document.createElement('div')
			div.setAttribute('data-index', index)
			return div
		}))
	}

	divify = (...data) => {
		// This is pretty inefficient, but it should work.
		const divs = new Set()
		data.forEach((passenger) => {
			const passengerID = passenger['passengerID']
			;[...this.divs].forEach((div) => {
				const divID = parseInt(div.getAttribute('data-index'))
				if (passengerID === divID) {
					divs.add(div)
				}
			})
		})
		return divs
	}

	datafy = (...divs) => {
		// This is pretty inefficient, but it should work.
		const data = new Set()
		divs.forEach((div) => {
			const divID = parseInt(div.getAttribute('data-index'))
			;[...this.data].forEach((passenger) => {
				const passengerID = passenger['passengerID']
				if (passengerID === divID) {
					data.add(passenger)
				}
			})
		})
		return passenger
	}
}
