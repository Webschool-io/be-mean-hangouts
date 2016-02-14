//


module.exports = (grunt) => {

	grunt.initConfig({
		sanduiche: {
			type: ['A', 'B', 'C'],
			price: 30000
		}
	});

	grunt.registerTask('default', [], () => {
		console.log('hello')
	});
}

