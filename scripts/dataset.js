class Dataset {
	constructor(data) {
		this.data = data
		this.divs = this.data.map((passenger) => {
			const index = passenger['passengerID']
			const div = document.createElement('div')
			div.setAttribute('data-index', index)
			return div
		})
	}
}
