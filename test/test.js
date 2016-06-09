'use strict';

var test = require('tape');
var processEvents = require('..')({
    SIGINT: 'shutdown',
    reload: 'reload'
});

test('basic interface', function (t) {
    t.plan(3);
    t.ok(typeof processEvents === 'object' && processEvents.constructor && processEvents.constructor.name === 'SigMapper', 'got a SigMapper instance');
    t.ok(typeof processEvents.on === 'function', 'on method visible');
    t.ok(typeof processEvents.disconnect === 'function', 'disconnect method visible');
});

test('process event mapping', function (t) {
    var sigintTimer, reloadTimer;

    t.plan(2);

    sigintTimer = setTimeout(function () {
        t.fail('SIGINT event received');
    }, 100);

    processEvents.on('shutdown', function () {
        clearTimeout(sigintTimer);
        t.pass('SIGINT event received');
    });

    process.emit('SIGINT');

    reloadTimer = setTimeout(function () {
        t.fail('reload event received');
    }, 100);

    processEvents.on('reload', function () {
        clearTimeout(reloadTimer);
        t.pass('reload event received');
    });

    process.emit('reload');

});
