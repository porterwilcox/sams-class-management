let router = require('express').Router();
let Users = require('../models/User');
let session = require('./session')

//NEVER TELL USERS WHICH FAILED
let loginError = new Error('Bad Email or Password')

router.post('/login', (req, res, next) => {
    Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return next(loginError)
            }
            if (!user.validatePassword(req.body.password)) {
                return next(loginError)
            }
            delete user._doc.hash
            req.session.uid = user._id
            res.send(user)
        })
        .catch(e => next(e))
})

router.post('/register', (req, res, next) => {
    req.body.hash = Users.hashPassword(req.body.password)
    Users.create(req.body)
        .then(user => {
            delete user._doc.hash
            req.session.uid = user._id
            res.send(user)
        })
        .catch(e => next(e))
})

router.get('/authenticate', (req, res, next) => {
    Users.findById(req.session.uid)
        .then(user => {
            if (!user) {
                return res.status(401).send({
                    message: "Login to continue."
                })
            }
            delete user._doc.hash
            req.session.uid = user._id
            res.send(user)
        })
        .catch(e => next(e))
})

router.delete('/logout', (req, res, next) => {
    req.session.destroy(e => {
        return e ? next(e) : res.send({ message: 'successfully logged out' })
    })
})

module.exports = { router, session }