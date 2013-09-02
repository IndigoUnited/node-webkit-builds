var m    = require('./package.json'),
    data = require('./data.json');

module.exports = {
    version: m.version,
    'release-notes': data['release-notes'],
    builds: {
        linux32: data.linux32,
        linux64: data.linux64,
        win32:   data.win32,
        mac32:   data.mac32
    }
};