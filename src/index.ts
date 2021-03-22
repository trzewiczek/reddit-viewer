import fs from 'fs'
import path from 'path'
import yaml from 'node-yaml'

interface Config {
  [groupName: string]: string[]
}

const cwd = process.cwd()

checkIfSubsFileExists()
const config: Config = yaml.readSync(path.join(cwd, 'subs.yaml'))
const groups = Object.keys(config)

checkIfSubRequested()
const requestedGroup = process.argv[2]

checkIfRequestedIsValid()
console.log('One day I will fetch news posts from these subs:')
console.log(config[requestedGroup].map(e => `  - ${e}`).join('\n'))

// in-scope helpers
function checkIfSubsFileExists (): void {
  if (fs.readdirSync(cwd).find(e => e === 'subs.yml' || e === 'subs.yaml') === undefined) {
    console.error(`
  There is no subs file. Please create \`subs.yaml\` structured like this:

    news:
      - news
      - worldnews
      - politics

    programming:
      - nodejs
      - javascript
      - webDev

    where 'news' and 'programming' are the names of groups of subs listed
    under such a group key.
    `)
    process.exit(1)
  }
}

function checkIfSubRequested (): void {
  if (process.argv.length === 2) {
    console.error(`
  Please use:

  $ rv <groupName>

  where <groupName> is one of:
${groups.map(e => `    - ${e}`).join('\n')}
    `)
    process.exit(1)
  }
}

function checkIfRequestedIsValid (): void {
  if (!groups.includes(requestedGroup)) {
    console.error(`
  Unfortunetly ${requestedGroup} in not present on the list. Use on of:
${groups.map(e => `    - ${e}`).join('\n')}
    `)
    process.exit(1)
  }
}
