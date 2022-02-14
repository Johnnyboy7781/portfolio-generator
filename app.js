const inquirer = require('inquirer');
// const generatePage = require('./src/page-template');
// const fs = require('fs');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log(`Portfolio complete! Check out index.html to see the output!`);
// })

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers))