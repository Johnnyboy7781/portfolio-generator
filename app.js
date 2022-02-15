const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site');
const fs = require('fs');
const inquirer = require('inquirer');

const mockData = {
    name: 'Jon',
    github: 'JonBoy',
    confirmAbout: true,
    about: 'I am a little boy ',
    projects: [
        {
        name: 'Run Buddy',
        description: 'A website where you can find other runners to excercise with',
        languages: ["Javascript", "HTML", "CSS"],
        link: 'johnboy.com/run-buddy',
        feature: true,
        confirmAddProject: true
        },
        {
        name: 'Taskmaster-Pro',
        description: 'A website where you can keep track of you tasks on a kanban-style board',
        languages: ["Javascript", "HTML", "CSS"],
        link: 'johnboy.com/taskmaster-pro',
        feature: true,
        confirmAddProject: true
        },
        {
        name: 'MyCows',
        description: 'A roadtrip game app',
        languages: ["Javascript", "HTML", "CSS"],
        link: 'johnboy.com/mycows',
        feature: false,
        confirmAddProject: false
        }
    ]
}

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name: (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username: (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
}

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a link!');
                return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
  };

promptUser()
  .then(promptProject)
  .then(portfolioData => {
      return generatePage(portfolioData);
  })
  .then(pageHTML => {
      return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  .catch(err => {
      console.log(err);
  })

// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./dist/index.html', generatePage(mockData), err => {
//             if (err) throw err;

//             console.log(`Portfolio complete! Check out index.html to see the output!`);

//             fs.copyFile('./src/style.css', './dist/style.css', err => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.log('Style sheet copied successfully!');
//             })
//         });
//     });
    
