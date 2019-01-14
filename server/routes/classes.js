let router = require('express').Router()
let Classes = require('../models/Class')

router.get('/', (req, res, next) => {
    Classes.find({ teacherId: req.session.uid })
        .then(classes => {
            res.send(classes)
        })
        .catch(e => next(e))
})

//get one with students
router.get('/:cId', (req, res, next) => {
    Classes.findById(req.params.cId)
        .populate('students').exec((e, classWithStudents) => {
            if (e) {
                return next(e)
            }
            res.send(classWithStudents)
        })
        .catch(e => next(e))
})

//create one
router.post('/', (req, res, next) => {
    Classes.create(req.body)
        .then(c => {
            return res.send(c)
        })
        .catch(e => next(e))
})

//modify
router.put('/:cId', (req, res, next) => {
    Classes.findById(req.params.cId)
        .then(c => {
            if (req.body.students) {
                return c.update(e, { $addToSet: { students: { $each: req.body.students } } })
            }
            else {
                return c.update(e)
            }
        })
        .then(() => { res.send({ message: "class successfully updated!" }) })
        .catch(e => next(e))
})

router.delete('/:cId', (req, res, next) => {
    Classes.findById(req.params.cId)
        .then(c => {
            return c.remove()
        })
        .then(() => { res.send({ message: "successfully deleted" }) })
        .catch(e => next(e))
})

module.exports = router