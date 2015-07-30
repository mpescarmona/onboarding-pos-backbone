module.exports = function(grunt) {

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'],
        //serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css', 'public/css/*.css'],
        mochaTests: ['app/tests/**/*.js']
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            all: {
                //src: watchFiles.clientJS.concat(watchFiles.serverJS),
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

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

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
    grunt.registerTask('lint', ['jshint:all', 'csslint']);

    // Build task(s).
    grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);


};