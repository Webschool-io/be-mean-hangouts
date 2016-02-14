//


module.exports = (grunt) => {
	grunt.initConfig({
		'uglify': {
			my_target: {
				files: {
					'./build/main.js' : './src/main.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
}