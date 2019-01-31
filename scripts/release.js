const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')

const curVersion = require('../package.json').version

const release = async () => {
  console.log(`Current version: ${curVersion}`)

  const bumps = ['patch', 'minor', 'major', 'prerelease']
  const versions = {}
  bumps.forEach(b => {
    versions[b] = semver.inc(curVersion, b)
  })
  const bumpChoices = bumps.map(b => ({
    name: `${b} (${versions[b]})`,
    value: b
  }))

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [...bumpChoices, { name: 'custom', value: 'custom' }]
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: answers => answers.bump === 'custom'
    }
  ])

  const version = customVersion || versions[bump]
  process.env.VERSION = version

  const { genDocs } = await inquirer.prompt([
    {
      name: 'genDocs',
      message: `Generate ${version} docs?`,
      type: 'confirm'
    }
  ])

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Confirm releasing ${version}?`,
      type: 'confirm'
    }
  ])

  if (yes) {
    await execa('npm', ['run', 'build'], { stdio: 'inherit' })
    await execa('git', ['add', 'dist'], { stdio: 'inherit' })
    await execa('git', ['commit', '-m', `build: build ${version}`], {
      stdio: 'inherit'
    })
    if (genDocs) {
      await execa('npm', ['run', 'docs:build'], { stdio: 'inherit' })
      await execa('git', ['add', 'docs/.vuepress/dist'], { stdio: 'inherit' })
      await execa('git', ['commit', '-m', `build: docs ${version}`], {
        stdio: 'inherit'
      })
    }
    await execa(
      'npm',
      ['version', version, '-m', `build: release ${version}`],
      { stdio: 'inherit' }
    )
  }

  require('./gen-changelog')(version)
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
