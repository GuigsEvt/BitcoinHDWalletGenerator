var inquirer = require('inquirer')

var questionIndex = [{
  name: 'indexChoice',
  message: '\nWhat do you want to do ?',
  type: 'list',
  choices: ['Display addresses',
    'Send tx',
    'Quit'],
  filter: function (str) {
    switch (str) {
      case 'Display addresses':
        return 1
      case 'Send tx':
        return 2
      case 'Quit':
        return -1
    }
  }
}]

module.exports = {
  home: function (callback) {
    inquirer.prompt(questionIndex).then(function (answers) {
      callback(answers)
    })
  },
  addressToAccess: function (callback) {
    var accountIndex = [{
      name: 'selectIndex',
      message: 'What is the index account of the address you wanna use ?'
    }]
    inquirer.prompt(accountIndex).then(function (answer) {
      callback(answer.selectIndex)
    });
  },
  addressToSend: function(address, amount, callback) {
    var amount = [{
      name: 'selectAddress',
      message: 'Sending ' + amount + 'satoshis from ' + address + '. What is the address you wanna send to ?'
    }]
    inquirer.prompt(amount).then(function (answer) {
      callback(answer.selectAddress);
    });
  }
}
