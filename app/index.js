'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AbbStaticGenerator = module.exports = function AbbStaticGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AbbStaticGenerator, yeoman.generators.Base);

AbbStaticGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'siteTitle',
    message: 'What is the <title> of this site?'
  }];

  this.prompt(prompts, function (props) {
    this.siteTitle = props.siteTitle;

    cb();
  }.bind(this));
};

AbbStaticGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('assets/css');
  this.mkdir('assets/scss');
  this.mkdir('assets/images');
  this.mkdir('assets/fonts');
  this.mkdir('assets/js');
  this.mkdir('assets/js/lib');
  this.mkdir('assets/js/app');
  
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('app.js', 'assets/js/app.js');
  
  this.copy('normalize.scss', 'assets/scss/normalize.scss');
  this.copy('vars.scss', 'assets/scss/vars.scss');
  this.copy('mixins.scss', 'assets/scss/mixins.scss');
  
  this.template('screen.scss', 'assets/scss/screen.scss');
  this.template('index.html', 'index.html');
  this.template('README.md', 'README.md');
};

AbbStaticGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};

AbbStaticGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
