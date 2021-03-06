let router = require('express').Router()
let Classes = require('../models/Models').ClassSchema

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
        .populate({path: 'students', select: 'firstName lastName forms'}).exec((e, classWithStudents) => {
            if (e) {
                return next(e)
            }
            res.send(classWithStudents)
        })
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
router.use('/update', (req, res, next) => {
    Classes.findById(req.body.id)
        .then(c => {
            if (req.body.students) {
                return c.update({ $addToSet: { students: { $each: req.body.students } } })
            }
            return c.update(req.body)
        })
        .then(() => { res.send({ message: "class successfully updated!" }) })
        .catch(e => next(e))
})

router.use('/delete/:cId', (req, res, next) => {
    Classes.findById(req.params.cId)
        .then(c => {
            return c.remove()
        })
        .then(() => { res.send({ message: "class successfully deleted" }) })
        .catch(e => next(e))
})

module.exports = router