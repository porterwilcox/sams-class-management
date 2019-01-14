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
    //find Users and students with this class id in their classes and remove the class
    Promise.all([
        Teachers.findOne({ classes: id })
            .then(teacher => {
                return teacher.update({ $pull: { classes: id }  })
            }),
        //
        //
        //TODO - iterate over collection of student models and update each one successfully
        Students.find({ classes: id })
            .then(students => {
                return students.forEach(s => s.update({ $pull: { classes: id }  }))
            })
    ])
        .then(() => console.log(`class ${id} removed from teacher and student accounts`))
        .catch(e => console.error(e))
})

module.exports = mongoose.model('Class', schema)