module.exports = function(grunt) {
    //Configure task(s)
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        watch: {
            //js: {
            //    file:['src/js/*.js'],
            //    tasks['uglify:dev']
            //}
            css: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev']
            }
        }
    });
    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    //Register task(s)
    grunt.registerTask('default', ['sass:dev']);
    grunt.registerTask('build', ['sass:build'])
};
