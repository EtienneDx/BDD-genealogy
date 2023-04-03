const dotenv = require('dotenv');
const os = require('os');
dotenv.config();

const CPU_COUNT = os.cpus().length;
const IS_DEV = process.env.NODE_ENV === 'development';
const FAIL_FAST = IS_DEV ? ['--fail-fast'] : [];
const FORMAT = process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar';

module.exports = {
  default: [
    './features/*.feature',
    ...FAIL_FAST,
    `--format ${FORMAT}`,
    `--format-options '{"snippetInterface": "synchronous"}'`,
    `--parallel ${CPU_COUNT}`,
    // '--require-module jsdom-global/register',
    '--require-module ts-node/register',
    // Dependencies
    // '--require ./features/utils/babel.ts',
    // Test
    // '--require ./features/worlds/index.ts',
    '--require ./features/step-definitions/index.ts',
  ].join(' '),
};