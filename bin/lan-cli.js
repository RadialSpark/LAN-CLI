#!/usr/bin/env node

'use strict';

const program = require('commander');

program
    .version('1.0.0')
    .arguments('<init> [lan|plan]', 'Create a new project')
    .action(require('../lib/init-helper'))
    .parse(process.argv);

