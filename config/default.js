const config = {};

config.REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
config.GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
config.QUEUE_DELAY = process.env.QUEUE_DELAY || 2000;
config.REPO_TEMP = process.env.REPO_TEMP || '/tmp/clonetrooper';
config.REPO_MAP = {};
config.FTP_HOST = process.env.FTP_HOST || ''; // CWD-- hard code for now to single account till we figure out mapping
config.FTP_USER = process.env.FTP_USER || ''; // CWD-- hard code for now to single account till we figure out mapping
config.FTP_PASS = process.env.FTP_PASS || ''; // CWD-- hard code for now to single account till we figure out mapping

module.exports = config;
