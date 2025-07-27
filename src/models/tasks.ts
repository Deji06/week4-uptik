import mongoose from 'mongoose'
// const User = require('../models/user')
const taskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'please type in your task']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {timestamps: true})


export default  mongoose.model('Note', taskSchema, "notes");