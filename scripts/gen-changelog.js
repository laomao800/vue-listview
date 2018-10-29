const execa = require('execa')
const cc = require('conventional-changelog')
const config = require('conventional-changelog-angular')

module.exports = version => {
  const fileStream = require('fs').createWriteStream(`CHANGELOG.md`)
  cc({
    config,
    releaseCount: 0,
    pkg: {
      transform(pkg) {
        pkg.version = `v${version}`
        return pkg
      }
    }
  })
    .pipe(fileStream)
    .on('close', async () => {
      await execa('git', ['add', 'CHANGELOG.md'], { stdio: 'inherit' })
      await execa(
        'git',
        ['commit', '-m', `chore: ${version} changelog [ci skip]`],
        { stdio: 'inherit' }
      )
    })
}
