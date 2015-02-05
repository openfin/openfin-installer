#!/usr/bin/env node
'use strict';
var meow = require('meow');
var openfinInstaller = require('./');

var cli = meow({
  help: [
    'Usage',
    '  openfin-installer <input>',
    '',
    'Example',
    '  openfin-installer Unicorn'
  ].join('\n')
});

openfinInstaller(cli.input[0]);
