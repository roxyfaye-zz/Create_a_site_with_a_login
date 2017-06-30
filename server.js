const express = require('express');
const mustache = require('mustache-express');
const application = express();
// const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

var storage = {
    users: [{ name: 'admin', password: 'qwer1234' }],
    sessionId: 0,
    sessions: []
};

application.use(cookieParser());
application.use(bodyParser.urlencoded());
application.use(express.static('public'));

application.use((request, response, next) => {
    if (request.cookies.session !== undefined) {
        var sessionId = parseInt(request.cookies.session);
        var user = storage.sessions[sessionId];

        if (!user) {
            response.locals.user = { isAuthenticated: false };
        }
        else {
            response.locals.user = { isAuthenticated: true };
        }
    } else {
        response.locals.user = { isAuthenticated: false };
    }

    next();
});


application.get('/', function(request, response){
        console.log('heuyyuuy')

    response.render('home');
})

application.get('/register', (request, response) => {
    console.log('meememem')
        response.render('register');
    });

application.post('/register', (request, response) => {
    
        var user = {
            name: request.body.name,
            password: request.body.password
        }

storage.users.push(user);

        response.redirect('/signin');
    });


application.get('/signin', (request, response) => {
        response.render('signin');
    });

application.post('/signin', (request, response) => {
        var name = request.body.name;
        var password = request.body.password;
        var user = storage.users.find(user => { return user.name === name && user.password === password })
        console.log('the user', user);
        if (!user) {
            response.render('signin');
        } else {
            var sessionId = storage.sessionId;
            storage.sessionId++;
            storage.sessions.push(user);
            response.cookie('session', sessionId);
            response.render('home', user);


        }
    });

const port = 3000
application.listen(port, function(){
   //should see these console loggin in the terminal
   console.log("server is running!");
   console.log('listening at port: ', port);
})
