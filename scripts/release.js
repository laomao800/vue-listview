/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const semver = require('semver')
const { prompt } = require('enquirer')
const currentVersion = require('../package.json').version

const preId =
  semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]
const inc = (i) => semver.inc(currentVersion, i, preId)
const bin = (name) => path.resolve(__dirname, '../node_modules/.bin/' + name)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const step = (msg) => console.log(chalk.cyan(msg))

const versionIncrements = [
  'patch',
  'minor',
  'major',
  ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
]

const release = async () => {
  console.log(`Current version: ${currentVersion}`)

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements
      .map((i) => `${i} (${inc(i)})`)
      .concat(['custom']),
  })

  let targetVersion
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  process.env.TARGET_VERSION = targetVersion

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  // run tests before release
  step('\nRunning tests...')
  await run(bin('jest'), ['--clearCache'])
  await run('npm', ['run', 'test:unit', '--bail'])

  // update all package versions and inter-dependencies
  step('\nUpdating version...')
  await run('npm', [
    'version',
    targetVersion,
    '-m',
    `build: release ${targetVersion}`,
    '--git-tag-version=false',
  ])

  // build all packages with types
  step('\nBuilding...')
  await run('npm', ['run', 'build'])

  // generate changelog
  await run(`npm`, ['run', 'changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await run('git', ['add', '-A'])
    await run('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // tag
  step('\nTag commit...')
  await run('git', ['tag', `v${targetVersion}`])
}

release().catch((err) => {
  console.error(err)
  process.exit(1)
})
