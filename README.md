# Inuits Drupal Project Generator

This project is the [Yeoman](http://yeoman.io) generator we use at [Inuits](http://inuits.eu) to quickly generate the new [Drupal](http://drupal.org) projects. It generates the Makefiles we use to build our projects using `drush make`, the basic installation profile, the theme and the base feature.

## Installation

First install Yeoman, if you have not yet done so.

```bash
sudo npm install -g yo
```

Then clone this repository

```bash
git clone git@github.com:Inuits/generator-drupal.git
```

Finally link it as a [npm](https://npmjs.org) module

```bash
cd generator-drupal
sudo npm link
```

## Generating a project

To create and setup a project using this generator we follow a few steps. First we generate the basic project structure. Then we build the entire Drupal tree using `drush make`. Then you need to create your configuration (the settings.php file). Finally you can install the project using your newly generated installation profile.

So let's do this. First run `yo` in an empty folder where you want to generate a project:

```bash
yo drupal
```

After answering some questions regarding the project name and readable project name, you are now ready to download Drupal core and some contrib-modules. To do this:

```bash
make
```

Then it's time to generate the configuration. Each developer who will work on the project will have to do this.

```bash
yo drupal:config
```

Finally it's time to install the Drupal site. As you will be developing the site, let's also enable some development modules which will not be enabled on your staging/production servers.

```bash
make devinstall
```

## Useful commands in the Makefile

The generated `Makefile` has some different commands. Here are the most useful ones:

* `make`: By default the Makefile will completely rebuild your Drupal, using `drush make`
* `make install`: Install your Drupal site using the installation profile
* `make dev`: Enable development modules and additional configuration for use during development. Note that each developer can further customize these to his personal preferences by writing a `Makefile.custom` file (see `Makefile.custom.sample` for an example)
* `make devinstall`: combine the `install` and `dev` steps


## License

This Yeoman Drupal Generator is licensed under the MIT license.

Copyright (c) 2015 Inuits, Jeroen Budts

