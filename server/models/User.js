let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT = 12

let schema = new Schema({
    email: {type: String, required: true, unique: true},
    hash: {type: String},
    classes: [{type: ObjectId, ref: 'Class'}],
    students: [{type: ObjectId, ref: 'Student'}]
}, {timestamps: true})

schema.statics.hashPassword = function(password) {
    return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hash) 
  }

module.exports = mongoose.model('User', schema)