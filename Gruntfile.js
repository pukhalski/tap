module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                options: {
                    banner: '/*\n  Handcrafted with love by Ilya Pukhalski (@pukhalski) and Mikhail Larchanka (@ashorror)\n*/\n'
                },
                files: {
                    'dist/tap.min.js': ['dist/tap.js']
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.task.registerTask('copy', 'Copy source files to dist directory', function() {
        grunt.file.copy('src/tap.js', 'dist/tap.js');

        grunt.log.writeln('File src/tap.js copied');
    });


    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};
