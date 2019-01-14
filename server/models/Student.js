let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let note = new Schema({
    title: {type: String},
    content: {type: String, required: true}
}, {timestamps: true})

//will probably have to make a form subschema hereq

let schema = new Schema({
    teacherId: {type: ObjectId, ref: 'User', required: true},
    classes: [{type: ObjectId, ref: 'Class'}],
    firstName: {type: 'String', required: true},
    lastName: {type: 'String', required: true},
    notes: [note]
}, {timestamps: true})

module.exports = mongoose.model('Student', schema)