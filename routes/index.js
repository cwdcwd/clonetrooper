const config = require('config');
const express = require('express');
const kue = require('kue');

const queue = kue.createQueue({
    redis: config.REDIS_URL
});
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Clone Trooper'
    });
});

router.post('/webhook', function(req, res) {
    const hookEvent = req.body;
    const hookHeaders = req.headers;
    const url = hookEvent.repository.url;
    // CWD-- TODO: validate hmac on headers for security but meh

    var job = queue.create('repo', {
        hookEvent, hookHeaders
    }).delay(config.QUEUE_DELAY).save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('job Id: ', job.id);
        }
    });

    job.attempts(3).backoff({
        type: 'exponential'
    });

    res.json(job);
});


module.exports = router;
