let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const Classes = require('./Class')

let note = new Schema({
    title: { type: String },
    content: { type: String, required: true }
}, { timestamps: true })

//will probably have to make a form subschema hereq

let schema = new Schema({
    teacherId: { type: ObjectId, ref: 'User', required: true },
    classes: [{ type: ObjectId, ref: 'Class' }],
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    notes: [note]
}, { timestamps: true })
 
schema.post('update', function () {
    let id = this._conditions._id
    let classIds = this._update.$addToSet.classes.$each
    Promise.all([
        Classes.find({ _id: { $in: classIds } })
            .then(classes => {
                if(!classes.length) return
                return Promise.all(classes.map(c => c.update({ $addToSet: { students: id }  })))
            })
    ])
    .then(() => `Student with id ${id} successfully added to/confirmed within classes.`)
    .catch(e => console.log(e))
})

module.exports = mongoose.model('Student', schema)