# node-webkit-builds [![Build Status](https://travis-ci.org/IndigoUnited/node-webkit-builds.png)](https://travis-ci.org/IndigoUnited/node-webkit-builds)

Easy [node-webkit](https://github.com/rogerwang/node-webkit) version dependency control.

## What is it?

`node-webkit-builds` allows you to easily control the dependency for [node-webkit](https://github.com/rogerwang/node-webkit). The module version is always in sync with the version of node-webkit, allowing you to declare the version of node-webkit in which you depend on.

This module provides you:

- URL to OS builds
    - linux32
    - linux64
    - win32
    - mac32
- URL of the release notes

## Usage

Start by installing the module using `npm install node-webkit-builds`. Refer to [npm](http://npmjs.org) for details on how to install a specific version of the module.

```
var nwb = require('node-webkit-builds');
console.log('version:', nwb.version);
console.log('release notes:', nwb.releaseNotes);
console.log('linux32:', nwb.builds.linux32);
console.log('linux64:', nwb.builds.linux64);
console.log('win32:', nwb.builds.win32);
console.log('mac32:', nwb.builds.mac32);
```

## Updating the module

In case you ever need to update this package manually, install [automaton](http://indigounited.com/automaton) (`nom install -g automaton`) and run `automaton tasks/update-module.autofile.js`. This will automatically look for new versions of the build, and update the module if necessary.