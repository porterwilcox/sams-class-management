let express = require('express')
let server = express()
let bp = require('body-parser')
let cors = require('cors')
let port = process.env.PORT || 3000
require('./db/db-config')

server.use(express.static(__dirname + '/../client/dist'))

server.use(bp.json( {limit: '20mb'}))
server.use(bp.urlencoded({
    extended: true
}))

let whitelist = ['http://localhost:8080']
let corsOptions = {
    origin: function (origin, callback) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
}
server.use(cors(corsOptions))

let auth = require('./auth/routes')
server.use(auth.session)
server.use('/auth', auth.router)

server.use('*', (req, res, next) => {
    if (req.method == "GET") {
        return next()
    }
    if (!req.session.uid) {
        return next(new Error("Not logged in."))
    }
    if (req.method = "POST"){
        req.body.teacherId = req.session.uid
        next()
    }
})
const students = require('./routes/students')
const classes = require('./routes/classes')
const teachers = require('./routes/teachers')
server.use('/api/teachers', teachers)
server.use('/api/classes', classes)
server.use('/api/students', students)

server.use('*', (e, req, res, next) => {
    console.log(e)
    res.status(e.status || 400).send({message: 'ERROR: ' + e.message})
})

server.listen(port, () => {
    console.log("Connected to ", port)
})