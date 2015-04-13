module.exports = function(grunt) {

    var src_dir = 'src/',
        dest_dir = 'dist/',
        banner = '(function( window ) {\n    var Tap = {};\n\n',
        footer = '\n})( window );';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                footer: footer
            },
            main: {
                src: [
                    src_dir + 'utils.js',
                    src_dir + 'events.js',
                    src_dir + 'tap.js'
                ],
                dest: dest_dir + 'tap.js',
            }
        },
        uglify: {
            main: {
                src: [ dest_dir + 'tap.js' ],
                dest: dest_dir + 'tap.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);

};
