var glob = require("glob");
var path = require('path');
var fs = require('fs');
var cpx = require('cpx');
var lessCssStream = require('less-css-stream');
var chalk = require('chalk');

// log functions
var chkErr = chalk.bold.red;
var chkDim = chalk.gray;
var chkInfo = chalk.cyan;
var chkMessage = chalk.magenta;
var chkSuccess = chalk.green;
var log = console.log;

// args normalization
var src_glob = path.normalize(process.cwd() + '/' + process.argv[2]) // a glob pattern eg: ./src/**/*.less
var dir_out = path.normalize(process.cwd() + '/' + process.argv[3]) // directory to put output css eg: lib

// options for cpx, used for the Less to Css stream transform
var cpxOptions = {
    transform: lessCssStream
}

log(chkMessage(`process started at ${new Date().toLocaleTimeString()}`));
log(chkDim(`source glob - ${src_glob}`));
log(chkDim(`destination - ${dir_out}`));
log(chkDim('--------------------------------------------------------------'));

/* 
cpx will copy the whole structure as is,
while passing each file through a transform stream (less to css stream) and parsing each file to css.
this didn't changed the .less extension, we will change it later on.
*/
cpx.copy(src_glob, dir_out, cpxOptions, function () {
    // output dir with the glob filter
    log(chkMessage("Copying files..."));
    var out_dir_glob = `${dir_out}/**/*.less`;

    glob(out_dir_glob, function (err, files) {
        if (err) throw err;

        // map on each file and change the extetension
        files.forEach(function (file) {
            log(chkInfo(`Renaming: `) + chkDim(`${file}`));

            var newFile = replaceExt(file, '.css');
            try {
                fs.renameSync(file, newFile);
                log(chkSuccess(`Success`) + ': ' + `${chkDim(newFile)}`);
            }
            catch (er) {
                log(chkErr(`Failed to rename ${file} to ${newFile} - ${err}`));
            }
            log(chkDim.bold('|>-<|'));
        });
        log(chkMessage(`Process ended at ${new Date().toLocaleTimeString()}`));
    });
});


function replaceExt(npath, ext) {
    if (typeof npath !== 'string') {
        return npath;
    }

    if (npath.length === 0) {
        return npath;
    }

    var nFileName = path.basename(npath, path.extname(npath)) + ext;
    return path.join(path.dirname(npath), nFileName);
}
