module.exports = function(grunt) {

  var config = grunt.file.readJSON('config.json');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      lib: {
        files: {
          'build/data-require.min.js': config.lib.src
        }
      },
      demo: {
        files: {
          'build/demo.min.js': config.demo.src
        }
      }
    },
    jasmine: {
      DataRequireJS: {
        options: {
          specs: ['test/data-require-spec.js'],
          keepRunner: true,
          template: require('grunt-template-jasmine-requirejs')
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false,
            debugSrc: config.demo.src,
            src: ['../build/demo.min.js']
          }
        },
        files: {
          "demo/index.html": ["demo/index.jade"]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jasmine', 'jade']);

};