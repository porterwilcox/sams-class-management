const router = require('express').Router()
const Teachers = require('../models/User')

router.use('/update', (req, res, next) => {
    Teachers.findById(req.session.uid)
        .then(u => {
            if (req.body.students || req.body.classes) {
                return u.update({ $addToSet: { students: { $each: req.body.students || [] } }, $addToSet: { classes: { $each: req.body.classes || [] } } })
            }
            return u.update(req.body)
        })
        .then(() => { res.send({ message: "teacher successfully updated!" }) })
        .catch(e => next(e))
})

module.exports = router