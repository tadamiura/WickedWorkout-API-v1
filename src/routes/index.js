const Authentification = require('./authentification') 
const Exercices = require('./exercices')
const Register = require('./register')
const Users = require('./users')
const WarmUps = require('./warmUps')
const VueUser = require('./vueUser')
const VueAuth = require('./vueAuth')

module.exports = {
    Authentification,
    Exercices,
    Register,
    Users,
    WarmUps,
    //for vue app
    VueUser,
    VueAuth
}