module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '(function () {\n\nvar Tap = {};\n',
                footer: '\n\n})();'
            },
            dist: {
                src: ['src/device.js', 'src/tap.js'],
                dest: 'dist/tap.js',
            },
        },
        uglify: {
            my_target: {
                options: {
                    banner: '/*\n  Handcrafted with love by Ilya Pukhalski (@pukhalski) and Mikhail Larchanka (@ashorror)\n*/\n'
                },
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