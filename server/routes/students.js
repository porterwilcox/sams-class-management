let router = require('express').Router()
let Students = require('../models/Models').StudentSchema

//get all
router.get('/', (req, res, next) => {
    Students.find({ teacherId: req.session.uid })
        .then(students => { res.send(students) })
        .catch(e => next(e))
})

//getOne
router.get('/:sId', (req, res, next) => {
    Students.findById(req.params.sId)
        .then(s => {
            if (!req.session.uid) {
                s.notes = []
            }
            res.send(s)
        })
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

//update
router.use('/update', (req, res, next) => {
    let data = req.body
    Students.findById(data.id)
        .then(s => {
            if (data.classes) {
                return s.update({ $addToSet: { classes: { $each: data.classes } } })
            }
            if (form = data.form) {
                if(!form._id) s.forms.unshift(form)
                else {
                    s.forms.pull({_id: form._id})
                    if(!form.delete) s.forms.unshift(form)
                }
                return s.save()
            }
            if (data.note) {
                s.notes.pull({_id: data.note._id})
                if (!data.note.content) return s.save()
                s.notes.unshift(data.note)
                return s.save()
            }
            return s.update(data)
        })
        .then(() => { res.send({ message: "student successfully updated!" }) })
        .catch(e => next(e))
})

//delete
router.use('/delete/:sId', (req, res, next) => {
    Students.findById(req.params.sId)
        .then(s => {
            return s.remove()
        })
        .then(() => { res.send({ message: "student successfully deleted" }) })
        .catch(e => next(e))
})

module.exports = router