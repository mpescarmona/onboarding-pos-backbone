'use strict';

module.exports = function(grunt) {
    // Unified Watch Object
    var watchFiles = {
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css']
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: watchFiles.clientJS,
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': 'public/dist/application.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': '<%= applicationCSSFiles %>'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task
    grunt.registerTask('default', function() {
        grunt.log.subhead('Backbone POS Demo - Build Utility - ' + Date());
        grunt.log.writeln();
        grunt.log.writeln('Available commands:');
        grunt.log.subhead('grunt clean');
        grunt.log.writeln('This command will remove the \'dist\' folder.');
        grunt.log.subhead('grunt css');
        grunt.log.writeln('This command compile the less files into css file. This command will not output any file to \'dist\' folder.');
        grunt.log.subhead('grunt dev');
        grunt.log.writeln('This command will output to \'dist\' folder the application using the development configurations for API urls,');
        grunt.log.writeln('compile th less files into a css file without minify, and will build one file with all .js scripts.');
        grunt.log.subhead('grunt release');
        grunt.log.writeln('This command will output to \'dist\' folder the application using the development configurations for API urls,');
        grunt.log.writeln('compile th less files into a css file without minify, and will build one file with all .js scripts.');
    });

    // Lint task(s).
    grunt.registerTask('lint', ['jshint', 'csslint']);

    // Build task(s).
    grunt.registerTask('build', ['lint', 'uglify', 'cssmin']);

    // Test task.
    grunt.registerTask('test', ['test:server', 'test:client']);
    grunt.registerTask('test:server', ['env:test', 'mochaTest']);
    grunt.registerTask('test:client', ['karma:unit']);
};
