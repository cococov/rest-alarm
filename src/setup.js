'use strict';

const inquirer = require('inquirer');
const fs = require('fs').promises;

const setup = async () => {

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Language: ',
      choices: ['Español', 'English']
    },
    {
      type: 'number',
      name: 'workTime',
      message: 'Tiempo de trabajo [Minutos]: ',
      default: 25
    },
    {
      type: 'number',
      name: 'restTime',
      message: 'Tiempo de descanso [Minutos]: ',
      default: 5
    }
  ]);

  let answersString = JSON.stringify(answers);
  console.log('\nWriting settings file...');
  await fs.writeFile('settings.json', answersString);

  console.clear();
  return answers;
}

module.exports = setup;