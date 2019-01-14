let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
    teacherId: {type: ObjectId, ref: 'User', required: true},
    students: [{type: ObjectId, ref: 'Student'}],
    name: {type: String, default: ""},
    period: {type: String, required: true}
}, {timestamps: true})

schema.pre('remove', function() {
    //find Users and students with this class id in their classes and remove the class
    console.log('schema pre remove triggered')
})

module.exports = mongoose.model('Class', schema)