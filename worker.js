const gitProcessor = require('./lib/gitProcessor');
const kue = require('kue');

const queue = kue.createQueue();

queue.process('repo', (job, done) => {
    const val = job.data;

    console.log(val);
    gitProcessor.processJob(val, done);

    return done(null, val);
});
