'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var ConfigGenerator = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Drupal7 Config generator!'
    ));

    var prompts = [{
      name: 'mysql_host',
      message: 'Hostname for your mysql server',
      default: 'localhost',
    },{
      name: 'mysql_db',
      message: 'Database name',
    },{
      name: 'mysql_user',
      message: 'MySQL username',
    },{
      name: 'mysql_pass',
      message: 'MySQL password',
    }];

    this.prompt(prompts, function (props) {
      this.mysql_host = props.mysql_host;
      this.mysql_db = props.mysql_db;
      this.mysql_user = props.mysql_user;
      this.mysql_pass = props.mysql_pass;

      done();
    }.bind(this));
  },

  writing: function () {
    var context = {
      mysql_host: this.mysql_host,
      mysql_db: this.mysql_db,
      mysql_user: this.mysql_user,
      mysql_pass: this.mysql_pass,
    };

    // build files
    this.dest.mkdir('htdocs/sites/default');
    this.template('_settings.php', 'htdocs/sites/default/settings.php', context);
  },

});

module.exports = ConfigGenerator;
