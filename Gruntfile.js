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
        },
        connect: {
          app:{
            options: {
              port: 9001,
              base: dest_dir,
              hostname: 'localhost',
              livereload: 35729
            }
          }
        },
        watch: {
          scripts: {
            files: [
                src_dir + '**/*.js',
                dest_dir + '**/*.html'
            ],
            tasks: ['concat', 'uglify'],
            options: {
              spawn: false,
              livereload: true
            },
          },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('serve', ['concat', 'uglify', 'connect', 'watch']);

};
