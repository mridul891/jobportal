const express = require('express')
const router = express.Router()
const adminRouter = require('./admin')
router.get('/admin', adminRouter)

module.exports = router