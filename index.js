var m    = require('./package.json'),
    data = require('./data.json');

module.exports = {
    version: m.version,
    releaseNotes: data['release-notes'],
    builds: {
        linux32: data.builds.linux32,
        linux64: data.builds.linux64,
        win32:   data.builds.win32,
        mac32:   data.builds.mac32
    }
};