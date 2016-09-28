'use strict';

let _ = require('lodash');
let config = require('config');
let Git = require("nodegit");

let ftpSrc=function(repo,cb){
    console.log('ftping: '+repo.path());
    //CWD: TODO: FTP HERE
    cb(null,repo);
};

let processJob=function(job, cb) {
    if(!_.isFunction(cb)){
        return false; //CWD-- bounce out on lack of call back. dunno what to do witchoo
    }

    let cloneOptions = {};
    cloneOptions.fetchOpts = {
        callbacks: {
            certificateCheck: function() {
                return 1;
            },
            credentials: function() {
                return NodeGit.Cred.userpassPlaintextNew(config.GITHUB_TOKEN, "x-oauth-basic");
            }
        }
    };

    let repo=job.hookEvent;
    let url=repo.repository.url;

    Git.Clone(url, config.REPO_TEMP+'/'+repo.repository.id, cloneOptions).then((repo) => {
        console.log(repo);
        ftpSrc(repo,cb)
    }).catch(function(err) {
        console.log(err);
        cb(err);
    });

    return true;
};


module.exports={ processJob };
