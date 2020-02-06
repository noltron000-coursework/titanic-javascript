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
