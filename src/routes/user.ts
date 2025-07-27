// const express = require('express')
import express from 'express'
const router = express.Router()
import {login, register} from '../controllers/auth'

router.post('/register', register)
router.route('/login').post(login)

export default router