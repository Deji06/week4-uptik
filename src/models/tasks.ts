
import mongoose from 'mongoose';

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
       completed: {
         type: Boolean,
         default: false
       }
     }, { timestamps: true });

     export default mongoose.model('Note', taskSchema, 'notes');


// import mongoose from 'mongoose'
// const taskSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         required: [true, 'please type in your task']
//     },
//     createdBy: {
//         type: mongoose.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     }

// }, {timestamps: true})


// export default  mongoose.model('Note', taskSchema, "notes");