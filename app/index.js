'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var DrupalProjectGenerator = yeoman.generators.Base.extend({
  // initializing: function () {
  //   this.pkg = require('../package.json');
  // },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Inuits Drupal7 Project generator!'
    ));

    var prompts = [{
      // type: 'confirm',
      name: 'projectName',
      message: 'What is the project name?',
      default: 'myproject'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  writing: {
    project: function () {
      // config files
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');

      // build files
      this.src.copy('_Makefile', 'Makefile');
      this.src.copy('_drush.make', 'drush.make');
      this.src.copy('_drush.dev.make', 'drush.dev.make');

      // basic project structure
      this.dest.mkdir('htdocs');
      this.dest.mkdir('patches');
      this.src.copy('keep', 'patches/.keep');
    },

    drupal: function () {
      this.dest.mkdir('htdocs/profiles');
    },

    custom: function () {
      var context = {
        project_name: this.projectName
      };

      // installation profile
      this.dest.mkdir('htdocs/profiles/' + this.projectName);
      this.template("profile/_profile.info", 'htdocs/profiles/' + this.projectName + '/' + this.projectName + '.info', context);
      this.template("profile/_profile.profile", 'htdocs/profiles/' + this.projectName + '/' + this.projectName + '.profile', context);
      this.template("profile/_profile.install", 'htdocs/profiles/' + this.projectName + '/' + this.projectName + '.install', context);

      // theme
      this.dest.mkdir('htdocs/profiles/' + this.projectName + '/themes');
      this.dest.mkdir('htdocs/profiles/' + this.projectName + '/themes/' + this.projectName + '_theme');
      this.template("theme/_theme.info", 'htdocs/profiles/' + this.projectName + '/themes/' + this.projectName + '_theme/' + this.projectName + '_theme.info', context);
      this.template("theme/_template.php", 'htdocs/profiles/' + this.projectName + '/themes/' + this.projectName + '_theme/template.php', context);

      // this.src.copy('_package.json', 'package.json');
      // this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      // this.src.copy('jshintrc', '.jshintrc');
    }
  },

  // end: function () {
  //   this.installDependencies();
  // }
});

module.exports = DrupalProjectGenerator;
