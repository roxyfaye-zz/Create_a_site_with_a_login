# Simple Express Setup


## Getting started:

clone the repo and set the name of the project
click the green button [clone/download] copy that url and paste it after `clone` in the terminal
```
git clone git@github.com:aaronjlech/simple-express-setup.git new-project
```
(new-project should be the name of your current project)

Run the following next
```
git remote remove origin
```
(this removes your express setup repository as the origin so we can generate a new repository for our new project)

next run
```
npm install
```
this will install all of our node modules locally

Make your build custom to your needs! If you install a new package and you're reusing it in multiple projects that is a sign you should update your setup!(example: I'm `npm install mustache-express` on multiple projects, I would update my setup `package.json` file in this repository.

Now we should be ready to go!

## Happy Coding
