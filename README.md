# Simple process signal mapper Node.js module

[![Build Status](https://travis-ci.org/ewngs/proc-sigmap.svg?branch=master)](https://travis-ci.org/ewngs/proc-sigmap)

So you want to handle signals like SIGINT but also IPC messages too. SigMapper gives you a standard interface that allows renaming/redirecting messages and handles received IPC data.

## Installation

```
npm install proc-sigmap --save
```

## Usage

```
var processEvents = require('proc-sigmap')({
    SIGINT: 'shutdown',
    SIGHUP: 'reload'
});
```

These are the default mappings if you call the sigmap without argument.
Then you can subscribe to an event on your proc-sigmap instance:

```
processEvents.on('shutdown', function() {
  // you should close your connections and things and exit now
});

```
