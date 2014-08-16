module.exports = function(grunt) {

    var
        src_dir = 'src/',
        dest_dir = 'build/';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '(function( window ) {\n\nvar Tap = {};\n\n',
                footer: '\n})( window );'
            },
            dist: {
                src: [
                    src_dir + '/utils.js',
                    src_dir + '/events.js',
                    src_dir + '/tap.js',
                    src_dir + '/export.js'
                ],
                dest: dest_dir + 'tap.js',
            },
        },
        uglify: {
            build: {
                options: {
                    banner: '/*\n  Handcrafted with love by Ilya Pukhalski (@pukhalski) and Mikhail Larchanka (@ashorror)\n*/\n'
                },
                src: [ dest_dir + 'tap.js' ],
                dest: dest_dir + 'tap.min.js'
                // files: {
                //     dest_dir + 'tap.min.js': [dest_dir + '/tap.js']
                // }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);

};
