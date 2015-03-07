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
      message: 'What is the project name? (for example: inuitsweb)',
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

      // build files
      this.template('_Makefile', 'Makefile', context);
      this.src.copy('_drush.make', 'drush.make');
      this.src.copy('_drush.dev.make', 'drush.dev.make');

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

      // base feature
      this.dest.mkdir('htdocs/profiles/' + this.projectName + '/modules');
      this.dest.mkdir('htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base');
      this.template("feature_base/_feature_base.features.filter.inc", 'htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base/' + this.projectName + '_base.features.filter.inc', context);
      this.template("feature_base/_feature_base.features.menu_custom.inc", 'htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base/' + this.projectName + '_base.features.menu_custom.inc', context);
      this.template("feature_base/_feature_base.features.user_permission.inc", 'htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base/' + this.projectName + '_base.features.user_permission.inc', context);
      this.template("feature_base/_feature_base.info", 'htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base/' + this.projectName + '_base.info', context);
      this.template("feature_base/_feature_base.module", 'htdocs/profiles/' + this.projectName + '/modules/' + this.projectName + '_base/' + this.projectName + '_base.module', context);

      // this.src.copy('_package.json', 'package.json');
      // this.src.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      // this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    // this.installDependencies();
    this.log(yosay(
      'Your new project is ready. You can now run `make` to build the project. Happy coding!'
    ));
  }
});

module.exports = DrupalProjectGenerator;
