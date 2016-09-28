'use strict';

let config = {};

config.GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
config.QUEUE_DELAY = process.env.QUEUE_DELAY || 5000;
config.REPO_TEMP = process.env.REPO_TEMP || '/tmp/clonetrooper';
config.REPO_MAP = {};

module.exports = config;
