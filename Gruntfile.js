module.exports = function(grunt) {

    var src_dir = 'src/',
        dest_dir = 'dist/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            options: {
                browserifyOptions: {
                    standalone: 'Tap'
                }
            },
            dist: {
                files: {
                  'dist/tap.js': ['src/tap.js'],
                },
            }
        },
        uglify: {
            main: {
                src: [ dest_dir + 'tap.js' ],
                dest: dest_dir + 'tap.min.js'
            },
            legacy: {
                src: [ dest_dir + 'tap.legacy.js' ],
                dest: dest_dir + 'tap.legacy.min.js'
            },
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'uglify']);

};
