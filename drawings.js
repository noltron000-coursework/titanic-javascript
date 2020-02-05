const drawData = (T) => {
	console.log('hello')
	noFilter(T)
}

const renderNode = (passenger) => {
	const parent = document.getElementById('container')
	const div = document.createElement('div')
	div.classList.add('passenger')
	parent.appendChild(div)
	
}

const noFilter = (T) => {
	T.data.forEach((passenger) => {
		renderNode(passenger)
	})
}

const filterByGender = (T) => {
	const men = T.data.filter((passenger) => {
		return passenger.sex == 'male'
	})
	const women = T.data.filter((passenger) => {
		return passenger.sex == 'female'
	})	
}
