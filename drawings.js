const drawData = (T) => {
	Dataset = new DataDrawing(T)
}

class DataDrawing {
	constructor(T) {
		this.data = T.data
		this.createNodes()
		this.renderNodes()
	}

	createNodes = () => {
		// elements array will contain all the passenger nodes.
		const elements = this.data.map((passenger, index) => {
			const div = document.createElement('div')
			div.classList.add('passenger')
			div.setAttribute('data-index', index)
			return div
		})
		this.nodes = elements
	}

	renderNodes = () => {
		const parent = document.getElementById('container')
		this.nodes.forEach((div) => {
			parent.appendChild(div)
		})
	}

	filterByGender = (T) => {
		const men = T.data.filter((passenger) => {
			return passenger.sex == 'male'
		})
		const women = T.data.filter((passenger) => {
			return passenger.sex == 'female'
		})
	}
}
