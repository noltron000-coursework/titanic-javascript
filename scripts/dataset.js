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

	divify = (data) => {
		return new Set(data.map((passenger) => {
			const passengerID = passenger['passengerID'];
			[...this.divs].forEach((node) => {
				if (node.getAttribute('data-index') === passengerID) {
					return node
				}
			})
		}))
	}

	datafy = (divs) => {
		// This is pretty inefficient, but it should work.
		return new Set(divs.map((node) => {
			const nodeID = node.getAttribute('data-index');
			[...this.data].forEach((passenger) => {
				if (passenger['passengerID'] === nodeID) {
					return passenger
				}
			})
		}))
	}
}
