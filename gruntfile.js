module.exports = function(grunt) {
    //Configure task(s)
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: true,
                    compress: false,
                    preserveComments: 'all'
                },
                src: 'src/js/*.js',
                dest: 'js/script.min.js'
            },
            build: {
                src: 'src/js/*.js',
                dest: 'js/script.min.js'
            }
        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'css/styles.css': 'src/scss/application.scss'
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/styles.css' : 'src/scss/application.scss'
                }
            }
        },
        htmlmin: {},
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify:dev']
            },
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev']
            }
        }
    });
    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //Register task(s)
    grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
    grunt.registerTask('build', ['uglify:build', 'sass:build'])
};
