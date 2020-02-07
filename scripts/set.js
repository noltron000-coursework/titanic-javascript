Set.prototype.union = function(that) {
	// Returns all elements from either this or that.
	return new Set([...this, ...that])
}

Set.prototype.intersection = function(that) {
	// Returns elements in both this and that.
	return new Set([...this].filter(item => that.has(item)))
}

Set.prototype.difference = function(that) {
	// Returns elements in this but never in that.
	return new Set([...this].filter(item => !that.has(item)))
}

Set.prototype.symmetricDifference = function(that) {
	// Returns elements in either this or that, but not both.
	const union = this.union(that)
	const intersection = this.intersection(that)
	return union.difference(intersection)
}

Array.prototype.union = function(that) {
	return [...new Set(this).union(new Set(that))]
}

Array.prototype.intersection = function(that) {
	return [...new Set(this).intersection(new Set(that))]
}

Array.prototype.difference = function(that) {
	return [...new Set(this).difference(new Set(that))]
}

Array.prototype.symmetricDifference = function(that) {
	return [...new Set(this).symmetricDifference(new Set(that))]
}
