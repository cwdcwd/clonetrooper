'use strict';

let _ = require('lodash');
let config = require('config');
let express = require('express');
let router = express.Router();

var kue = require('kue'),
    queue = kue.createQueue();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Clone Trooper'
    });
});

router.post('/webhook', function(req, res, next) {
    let hookEvent = req.body;
    let hookHeaders = req.headers;
    let url = hookEvent.repository.url;
    //CWD-- TODO: validate hmac on headers for security but meh

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
