import res from 'express/lib/response.js'
import express from 'express';
import __dirname from '../../utils.js';
// import __dirname from 'path';

const app = express();
app.use(express.static(__dirname + '/public'));

const indexa = __dirname + '/public/indexLogin/indexa.html';
const login = __dirname + '/public/indexLogin/login.html';
const signup = __dirname + '/public/indexLogin/signup.html';

function getRoot(req, res) {
    res.sendFile(indexa)
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        const user = req.user
        res.send('login-ok')
    } else {
        res.sendFile(login)
    }
}

function postLogin(req, res) {
    console.log(req.user)

    res.sendFile(indexa)
}

function getSignup(req, res) {
    res.sendFile(signup)
}

function getFailsignup(req, res) {
    res.send('Fail signup')
}

function postSignup(req, res) {
    console.log(req.user)

    res.sendFile(indexa)
}

const module = {
    getRoot,
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getFailsignup
}
export default module;