let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const Teachers = require('../models/User')
const Students = require('../models/Student')

let schema = new Schema({
    teacherId: { type: ObjectId, ref: 'User', required: true },
    students: [{ type: ObjectId, ref: 'Student' }],
    name: { type: String, default: "" },
    period: { type: String, required: true }
}, { timestamps: true })

schema.pre('remove', function () {
    let id = this._doc._id //ObjectId
    Promise.all([
        Teachers.findOne({ classes: id })
            .then(teacher => {
                if (!teacher) return
                return teacher.update({ $pull: { classes: id }  })
            }),
        Students.find({ classes: id })
            .then(students => {
                if(!students.length) return
                return Promise.all(students.map(s => s.update({ $pull: { classes: id }  })))
            })
    ])
        .then(() => console.log(`class ${id} removed from teacher and student accounts`))
        .catch(e => console.error(e))
})

module.exports = mongoose.model('Class', schema)