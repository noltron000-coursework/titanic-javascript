const drawData = (T) => {
	Dataset = new DataDrawing(T)
}

class DataDrawing {
	constructor(T) {
		this.data = T.data
		this.createNodes()
		this.renderNodes()
		this.filterByGender()
	}

	createNodes = () => {
		// nodes array will contain all the passenger nodes.
		const nodes = this.data.map((passenger, index) => {
			const div = document.createElement('div')
			div.setAttribute('data-index', index)
			return div
		})
		this.nodes = nodes
	}

	renderNodes = () => {
		const parent = document.getElementById('container')
		this.nodes.forEach((div) => {
			parent.appendChild(div)
		})
	}

	filterByGender = () => {
		const men = this.nodes.filter((div, index) => {
			const passenger = this.data[index]
			return passenger.sex == 'male'
		})

		const women = this.nodes.filter((div, index) => {
			const passenger = this.data[index]
			return passenger.sex == 'female'
		})
		
		men.forEach((div) => {
			div.classList.add('male')
		})
		women.forEach((div) => {
			div.classList.add('female')
		})
	}
}
