'use strict';

var download = require('autofile-download');
var mkdir    = require('autofile-mkdir');
var rm       = require('autofile-rm');
var fs       = require('fs');
var semver   = require('semver');
var exec     = require('child_process').exec;

var pkgJsonFile  = __dirname + '/../package.json',
    dataJsonFile = __dirname + '/../data.json';

module.exports = function (task) {
    task
    .id('update')
    .name('update')
    .author('Indigo United')

    .option('fail', 'If should give exit error code when no updates available', false)

    .setup(function (opts, ctx, next) {
        opts.readMeFile = __dirname + '/tmp/node-webkit-readme.md';

        next();
    })

    .do(rm, {
        description: 'Assert tmp dir is clear',
        options: {
            files: __dirname + '/tmp'
        }
    })

    .do(mkdir, {
        options: {
            dirs: __dirname + '/tmp'
        }
    })

    .do(download, {
        description: 'Download node-webkit README.md file',
        options: {
            files: {
                'https://raw.github.com/rogerwang/node-webkit/master/README.md': '{{readMeFile}}'
            }
        }
    })

    .do(function (opts, ctx, next) {
        fs.readFile(opts.readMeFile, {
            encoding: 'utf8'
        }, function (err, data) {
            if (err) {
                return next(err);
            }
            // Links should follow the following pattern:
            // * Linux: [32bit](URL) / [64bit] (URL)
            // * Windows: [win32](URL)
            // * Mac: [32bit, 10.7+](URL)

            // capture the links
            var linux32 = /linux.*32bit[^\(]*\((http[^\)]+)\)/i.exec(data)[1],
                linux64 = /linux.*64bit[^\(]*\((http[^\)]+)\)/i.exec(data)[1],
                win32   = /win32[^\(]*\((http[^\)]+)\)/i.exec(data)[1],
                mac32   = /mac.*32bit[^\(]*\((http[^\)]+)\)/i.exec(data)[1],
                tmp     = /\[v([^\s]+)\s+release notes\]\(([^\)]+)/i.exec(data),
                version = tmp[1],
                releaseNotes = tmp[2];

            ctx.log.debugln('Captured version:', version);
            ctx.log.debugln('linux64:', linux64);
            ctx.log.debugln('linux32:', linux32);
            ctx.log.debugln('win32:', win32);
            ctx.log.debugln('mac32:', mac32);
            ctx.log.debugln('release notes:', releaseNotes);


            var pkg = require(pkgJsonFile);

            if (!semver.valid(version)) {
                next(new Error('Unexpected version in README.md:', version));
            }

            // if the node-webkit release is greater than the module version
            if (semver.gt(version, pkg.version)) {
                ctx.log.successln('Found new version:', pkg.version, '->', version);
                pkg.version = version;

                fs.writeFile(pkgJsonFile, JSON.stringify(pkg, null, '  '), function (err) {
                    if (err) {
                        return next(err);
                    }

                    fs.writeFile(dataJsonFile, JSON.stringify({
                        'release-notes': releaseNotes,
                        builds: {
                            linux32: linux32,
                            linux64: linux64,
                            win32:   win32,
                            mac32:   mac32
                        }
                    }, null, '  '), function (err) {
                        if (err) {
                            return next(err);
                        }

                        var child,
                            cmd = 'pushd ' + __dirname + '../; git commit -am "bump version: ' + pkg.version + '"; git push origin master; npm publish'
                        ;

                        child = exec(cmd, function (err, stdout, stderr) {
                            if (err) {
                                ctx.log.debugln('Error bumping version in git:', stderr);
                            }

                            ctx.log.successln('Published new version');

                            next(err);
                        });
                    });
                });
            } else {
                ctx.log.warnln('Did not find more recent version');
                // if should fail when no updates available, throw exit code error
                if (opts.fail) {
                    process.exit(1);
                } else {
                    next();
                }
            }

            next();
        });
    }, {
        description: 'Check for new version and update module if necessary'
    });
};
