'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function SigMapper(procMap) {
    var self = this,
        onMessage = this._onMessage.bind(this);

    EventEmitter.call(this);

    this._procMap = typeof procMap === 'object' ? procMap : {
        SIGINT: 'shutdown',
        SIGHUP: 'reload'
    };

    process.on('message', onMessage);

    // register mapped event handlers
    Object.keys(this._procMap).forEach(function (key) {
        process.on(key, (function (toMsg) {
            return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(toMsg);
                self._onMessage.apply(self, args);
            };
        })(self._procMap[key]));
    });
}

util.inherits(SigMapper, EventEmitter);

SigMapper.prototype._onMessage = function (data) {
    var msgName, msgData;
    if (typeof data === 'object') {
        msgName = data.name;
        msgData = data.data;
    }
    else {
        msgName = data;
    }

    this.emit(msgName, msgData);
};

SigMapper.prototype.disconnect = function () {
    if (process.disconnect) {
        process.disconnect();
    }
};

module.exports = function (procMap) {
    return new SigMapper(procMap);
};
