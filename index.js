var m = require('./package.json');

module.exports = {
    version: m.version,
    "release-notes": "https://groups.google.com/d/msg/node-webkit/lT9M8vlIL78/GlWvjuUUh3cJ",
    builds: {
        linux32: "https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-linux-ia32.tar.gz",
        linux64: "https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-linux-x64.tar.gz",
        win32:   "https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-win-ia32.zip",
        mac32:   "https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-osx-ia32.zip"
    }
};