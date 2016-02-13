//


const map = function(f, l) {
	return l.reduce(function(acc, x) {
		return acc.concat(x);
	}, []);
}

const filter = function(p, l) {
	return l.reduce(function(acc, x) {
		return p(x) ? acc.concat(p(x)) : acc;
	}, []);
}