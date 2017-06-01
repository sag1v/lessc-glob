# lessc-glob
A node package that compiles **ALL** *.less* files in a directory and copy the entire structure to another directory.

This module takes a glob pattern and a target directory.  
It will parse **ALL** `.less` files in that given pattern to `.css` syntax,  
and will write the `CSS` files into the specified traget directory while keeping the same structure of directories.

This function ***does*** run recursively, that is, it *does* look inside subdirectories (with the help of *glob*).

## Installation

    $ npm install lessc-glob

## Usage

### Command Line

    $ lessc-glob  ‹glob›  ‹target›

Where
`‹glob›` is the glob pattern eg: `./src/**/*.less`.
`‹target›` is the destination directory for output files eg: `lib`.
If `‹target›` does not exist, it will automatically be created.
**Both directories *must* be relative to the current path of the command line.**

### Programmatic

(in your own node module)

Currently not supported.

```js
// maybe in the future...
var lesscGlob = require('lessc-glob')
lesscGlob([glob], [target])
```


## Info

Required

Make sure you pass only `.less` files in your glob.


## Changelog

It’s on [Github](https://github.com/sag1v/lessc-glob/releases).
