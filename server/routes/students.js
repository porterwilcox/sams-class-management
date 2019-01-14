let router = require('express').Router()
let Students = require('../models/Student')

//get all
router.get('/', (req, res, next) => {
    Students.find({ teacherId: req.session.uid })
        .then(students => { res.send(students) })
        .catch(e => next(e))
})

//create one
router.post('/', (req, res, next) => {
    Students.create(req.body)
        .then(s => {
            return res.send(s)
        })
        .catch(e => next(e))
})

router.use('/delete/:sId', (req, res, next) => {
    Students.findByIdAndDelete(req.params.sId)
        .then(() => { res.send({ message: "successfully deleted" }) })
        .catch(e => next(e))
})

module.exports = router