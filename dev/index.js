'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var DrupalDevGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Inuits Drupal7 development generator!'
    ));

    var prompts = [{
      // type: 'confirm',
      name: 'drupalRoot',
      message: 'What is the root of the Drupal site in the repo (e.g. htdocs). Leave empty if Drupal is in the root of the repo.',
    }];

    this.prompt(prompts, function (props) {
      this.drupalRoot = props.drupalRoot;

      done();
    }.bind(this));
  },

  writing: {
    custom: function () {
      var context = {
        drupal_root: this.drupalRoot ? this.drupalRoot : '.',
        dev_make: (this.drupalRoot ? '../' : '') + 'drush.dev.make',
      };

      // build files
      this.template('_Makefile.dev', 'Makefile.dev', context);
      this.template('_Makefile.custom.sample', 'Makefile.custom.sample', context);
      this.src.copy('_drush.dev.make', 'drush.dev.make');
    },
  },
});

module.exports = DrupalDevGenerator;
