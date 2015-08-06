'use strict';

var processEvents = require('..')({
    SIGINT: 'beeboobaa'
});

var timer = setInterval(function () {
    console.log('tick');
}, 1000);

processEvents.on('beeboobaa', function () {
    console.log('should shutdown');
    clearInterval(timer);
});
