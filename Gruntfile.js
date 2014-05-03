module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '(function () {\n\nvar Tap = {};\n',
                footer: '\nwindow.Tap = Tap;\n\n})();'
            },
            dist: {
                src: ['src/device.js', 'src/tap.js', 'src/init.js'],
                dest: 'dist/tap.js',
            },
        },
        uglify: {
            my_target: {
                files: {
                    'dist/tap.min.js': ['dist/tap.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};