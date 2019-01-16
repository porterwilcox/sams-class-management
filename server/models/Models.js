let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//CLASSES---------------------------------------------
let classSchema = new Schema({
    teacherId: { type: ObjectId, ref: 'User', required: true },
    students: [{ type: ObjectId, ref: 'Student' }],
    name: { type: String, default: "" },
    period: { type: String, required: true }
}, { timestamps: true })

classSchema.pre('remove', function () {
    let id = this._doc._id //ObjectId
    StudentSchema.find({ classes: id })
        .then(students => {
            if (!students.length) return
            return Promise.all(students.map(s => s.update({ $pull: { classes: id } })))
        })
        .then(() => console.log(`class ${id} removed from teacher and student accounts`))
        .catch(e => console.error(e))
})

classSchema.post('update', function () {
    let id = this._conditions._id
    let studentIds = this._update.$addToSet.students.$each
    StudentSchema.find({ _id: { $in: studentIds } })
        .then(students => {
            if (!students.length) return
            return Promise.all(students.map(s => s.update({ $addToSet: { classes: id } })))
        })
        .then(() => `class ${id} successfully updated with students.`)
        .catch(e => console.log(e))
})

//STUDENTS---------------------------------------------
let note = new Schema({
    title: { type: String },
    content: { type: String, required: true }
})

let form = new Schema({
    classId: {type: ObjectId, ref: 'Class'},
    checkboxes: {/* missingWorkAssigment: 0 || 1 */} ,
    comments: [note]
}, {timestamps: true})

let studentSchema = new Schema({
    teacherId: { type: ObjectId, ref: 'User', required: true },
    classes: [{ type: ObjectId, ref: 'Class' }],
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    notes: [note],
    form: [form]
}, { timestamps: true })

studentSchema.pre('remove', function () {
    let id = this._doc._id //ObjectId
    ClassSchema.find({ students: id })
        .then(classes => {
            if (!classes.length) return
            return Promise.all(classes.map(c => c.update({ $pull: { students: id } })))
        })
        .then(() => console.log(`student with id ${id} removed from teacher accounts and classes`))
        .catch(e => console.error(e))
})

studentSchema.post('update', function () {
    let id = this._conditions._id
    let classIds = this._update.$addToSet.classes.$each
    ClassSchema.find({ _id: { $in: classIds } })
        .then(classes => {
            if (!classes.length) return
            return Promise.all(classes.map(c => c.update({ $addToSet: { students: id } })))
        })
        .then(() => `Student with id ${id} successfully added to/confirmed within classes.`)
        .catch(e => console.log(e))
})

const ClassSchema = mongoose.model('Classs', classSchema)
const StudentSchema = mongoose.model('Student', studentSchema)

module.exports = { ClassSchema, StudentSchema }