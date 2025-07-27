
// const express = require('express')
import express from 'express'
import {getAllTasks, getTask, createNewTask, updateTask,deleteTask}  from '../controllers/tasks'
const router = express.Router()
 
router.route('/').get(getAllTasks).post(createNewTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router