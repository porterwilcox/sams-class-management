let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const Classes = require('./Models')
const Teachers = require('./User')



module.exports = mongoose.model('Student', schema)