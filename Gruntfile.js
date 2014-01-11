module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'data-require.js',
        dest: 'build/data-require.min.js'
      }
    },
    jasmine: {
      DataRequireJS: {
        //src: ['data-require.js'],
        options: {
          specs: ['data-require-spec.js'],
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs') /*,
          templateOptions: {
            requireConfig: {
              baseUrl: ''
            }
          }*/
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};