/*
 * grunt-hash-url
 *
 * Copyright (c) 2013 zensh
 * Licensed under the MIT license.
 * https://github.com/zensh/grunt-hash-url
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var crypto = require('crypto');

  grunt.registerMultiTask('hash', 'Hash urls in files(html, css...).', function() {

    var options = this.options({
      algorithm: 'md5',
      urlCwd: ''
    });

    var tally = {
      urls: 0,
      files: 0
    };

    this.files.forEach(function(file) {
      var count = 0,
        contents = getFile(file.src[0]);
      contents = contents.replace(/\{\{_([^_\}\}]*)_\}\}/g, function (str, url) {
        var file = getFile(options.urlCwd + url);
        count += 1;
        return url + '?v=' + getHash(file, options.algorithm);
      });
      // Write joined contents to destination filepath.
      grunt.file.write(file.dest, contents);
      // Print a success message.
      tally.urls += count;
      tally.files += 1;
      grunt.log.writeln('File "' + file.dest + '" created, ' + count + ' urls hashed.');
    });

    grunt.log.writeln('Created ' + tally.files + ' files, hashed ' + tally.urls + ' urls.');
  });

  function getFile(filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return '';
    } else {
      return grunt.file.read(filepath, {
        encoding: 'utf8'
      });
    }
  };

  function getHash(file, algorithm) {
    algorithm = algorithm || 'md5';
    return file ? crypto.createHash(algorithm).update(file, 'utf8').digest('hex') : '';
  };

};