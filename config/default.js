'use strict';

let config = {};

config.GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
config.QUEUE_DELAY = process.env.QUEUE_DELAY || 2000;
config.REPO_TEMP = process.env.REPO_TEMP || '/tmp/clonetrooper';
config.REPO_MAP = {};
config.FTP_HOST = process.env.FTP_HOST || ''; //CWD-- hard code for now to single account till we figure out mapping
config.FTP_USER = process.env.FTP_USER || ''; //CWD-- hard code for now to single account till we figure out mapping
config.FTP_PASS = process.env.FTP_PASS || ''; //CWD-- hard code for now to single account till we figure out mapping

module.exports = config;
