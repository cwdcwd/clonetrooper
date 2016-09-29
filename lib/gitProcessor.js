'use strict';

const _ = require('lodash');
const fs = require('fs');
const config = require('config');
const Git = require('nodegit');
const rmdir = require('rmdir');
const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();


const ftpSrc = function(repo, cb) {
    console.log('ftping: ', repo.repository.name);
    const targetPath = '/tmp/clonetrooper';

    if (!_.isFunction(cb)) {
        console.log('where be the cb?');
        return false; // CWD-- bounce out on lack of call back. dunno what to do witchoo
    }

    const ftpConfig = {
        username: config.FTP_USER,
        password: config.FTP_PASS, // optional, prompted if none given
        host: config.FTP_HOST,
        port: 21,
        localRoot: config.REPO_TEMP + '/' + repo.repository.id,
        remoteRoot: targetPath,
        continueOnError: true,
        //        exclude: ['.git', '.idea', 'tmp/*']
    };

    console.log('trying to conenct to :', config.FTP_HOST);

    ftpDeploy.deploy(ftpConfig, (err) => {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('finished');
            cb(null, repo);
        }
    });

    return true;
};

let processJob = function(job, cb) {
    if (!_.isFunction(cb)) {
        console.log('where be the cb?');
        return false; // CWD-- bounce out on lack of call back. dunno what to do witchoo
    }

    const cloneOptions = {};
    cloneOptions.fetchOpts = {
        callbacks: {
            certificateCheck: () => {
                return 1;
            },
            credentials: () => {
                return NodeGit.Cred.userpassPlaintextNew(config.GITHUB_TOKEN, "x-oauth-basic");
            }
        }
    };

    const repo = job.hookEvent;
    const url = repo.repository.url;
    const dir = config.REPO_TEMP + '/' + repo.repository.id;

    fs.stat(dir, (err, stats) => {
        if (err && err.errno != -2) {
            console.log(err);
            cb(err);
        } else {
            let fClone = () => {
                Git.Clone(url, dir, cloneOptions).then((cloneRepo) => {
                    console.log(cloneRepo);
                    ftpSrc(repo, cb);
                }).catch((cloneErr) => {
                    console.log(cloneErr);
                    cb(cloneErr);
                });
            };

            if (stats && stats.isDirectory()) { // CWD-- if we've found an existing dir
                console.log('repo folder (' + dir + ') exists. removing')
                rmdir(dir, (rmdirErr, dirs, files) => { // CWD-- kill existing dir
                    if (rmdirErr) {
                        console.log(rmdirErr);
                    }

                    fClone();
                });
            } else { // CWD-- no dir, no problems
                fClone()
            }
        }
    });

    return true;
};


module.exports = {
    processJob
};
