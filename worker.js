const config = require('config');
const gitProcessor = require('./lib/gitProcessor');
const kue = require('kue');

const queue = kue.createQueue({
    redis: config.REDIS_URL
});

queue.process('repo', (job, done) => {
    const val = job.data;

    console.log(val);
    gitProcessor.processJob(val, done);

    return done(null, val);
});
