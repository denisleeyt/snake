const fs = require('fs');
const path = require('path');
const semver = require('semver');
const conventionalRecommendedBump = require('conventional-recommended-bump');
const formatCommitMessage = require('standard-version/lib/format-commit-message');
const presetLoader = require('standard-version/lib/preset-loader');
// const changelog = require('standard-version/lib/lifecycles/changelog');
const runExecFile = require('standard-version/lib/run-execFile');
const { resolveUpdaterObjectFromArgument } = require('standard-version/lib/updaters');
const writeFile = require('standard-version/lib/write-file');

const { CI_COMMIT_SHORT_SHA = 'SNAPSHOT', CI_COMMIT_REF_SLUG = 'UNKNOW' } = process.env;
// const CI_COMMIT_SHORT_SHA = Math.round(Math.random() * 1000000);

const PKG_JSON = 'package.json';
const PKG_PREFIX = 'snake@';
const DEV_PKG_NAME = 'dev';

const updater = resolveUpdaterObjectFromArgument(PKG_JSON);
const pkgPath = path.resolve(process.cwd(), 'package.json');
const contents = fs.readFileSync(pkgPath, 'utf8');
const version = updater.updater.readVersion(contents);

const args = {
  skip: {},
  bumpFiles: [],
  infile: 'CHANGELOG.md',
  tagPrefix: PKG_PREFIX,
  commitAll: true,
};

const presetOptions = presetLoader(args);

const updateConfigs = (newVersion) => {
  const updater = resolveUpdaterObjectFromArgument(PKG_JSON);
  const configPath = path.resolve(process.cwd(), updater.filename);
  updater.updater.writeVersion(contents, newVersion);
  writeFile(args, configPath, updater.updater.writeVersion(contents, newVersion));
};

const commit = async (newVersion) => {
  const commitMsgFormat = 'chore(release): {{currentTag}}';
  await runExecFile(args, 'git', ['add'].concat(['.']));
  await runExecFile(
    args,
    'git',
    ['commit'].concat('--no-verify', ['-m', `${formatCommitMessage(commitMsgFormat, newVersion)}`]),
  );
};

const publish = async () => {
  const cmdArgs = ['--tag', CI_COMMIT_REF_SLUG];
  await runExecFile(args, 'npm', ['publish'].concat(cmdArgs));
};

conventionalRecommendedBump(
  {
    debug: args.verbose && console.info.bind(console, 'conventional-recommended-bump'),
    preset: presetOptions,
    path: args.path,
    tagPrefix: args.tagPrefix,
    lernaPackage: args.lernaPackage,
  },
  (err, release) => {
    if (err) throw new Error(err);
    const nextVersion = semver.inc(version, release.releaseType);
    const newDevVersion = `${nextVersion}-${DEV_PKG_NAME}.${CI_COMMIT_SHORT_SHA}`;
    // const newTag = `${PKG_PREFIX}${newDevVersion}`;

    updateConfigs(newDevVersion);
    // changelog(args, newDevVersion)
    Promise.resolve()
      .then(() => commit(newDevVersion))
      .then(() => publish());
  },
);
