'use strict';

var _ = require('lodash');
var kue = require('kue'),
    queue = kue.createQueue();
let gitProcessor = require('./lib/gitProcessor');

queue.process('repo', function(job, done) {
    var val = job.data;

    console.log(val);
    gitProcessor.processJob(val, done);

    return done(null, val);
});
