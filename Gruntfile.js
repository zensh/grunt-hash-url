/*
 * grunt-contrib-copy
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Chris Talkington, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['test/dist']
    },

    // Configuration to be run (and then tested).
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'test/src/js', src: ['*.*'], dest: 'test/dist/js'},
          {expand: true, cwd: 'test/src/css', src: ['*.*'], dest: 'test/dist/css'},

        ]
      }
    },

    hash: {
      index: {
        options: {
          algorithm: 'md5',
          urlCwd: 'test/dist/'
        },
        dest: 'test/dist/index.html',
        src: 'test/src/index.html'
      }
    },

    // Unit tests.
    // nodeunit: {
    //   tests: ['test/*_test.js']
    // }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['clean', 'copy', 'hash']);
  grunt.registerTask('default', ['jshint', 'test']);
};