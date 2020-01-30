// Define new class for passengers.
// The inputs are pretty ugly so this will fix it up.
class Passenger {
	// A row of data in JSON represents a passenger.
	// A passanger is just a person with several qualities,
	// including their ticket purchase and personal info.
	constructor(entry) {
		// Cleaned metadata goes here.
		this.dataID = entry['datasetid']
		this.ticketID = entry['fields']['ticket']
		this.passengerID = entry['fields']['passengerid']
		this.recordID = entry['recordid']
		this.recordTime = entry['record_timestamp']

		// Passenger - personal information.
		this.name = entry['fields']['name']
		this.age = entry['fields']['age']
		this.sex = entry['fields']['sex']
		// This field includes both siblings & spouses.
		this.numSiblings = entry['fields']['sibsp']
		// This field includes both children & parents.
		this.numChildren = entry['fields']['parch']
		// This field is a string where it should be boolean.
		this.survived = this._cleanSurvived(entry)

		// Passenger - ticket information.
		this.fare = entry['fields']['fare']
		this.class = entry['fields']['pclass']
		this.cabin = entry['fields']['cabin']
		this.embarked = entry['fields']['embarked']
	}

	_cleanSurvived = (entry) => {
		// This internal function cleans the "survived" field.
		switch (entry['fields']['survived']) {
			case 'Yes':
				return true
			case 'No':
				return false
			default:
				return null
		}
	}
}
