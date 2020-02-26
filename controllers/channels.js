// Require
const Channels = require('../models/channels')
const router = require('express').Router()

// Routes
router.post('/', (req, res) => {
	Channels.create(req.body)
		.then(channel => {
			res.send(channel)
		})
		.catch(err => res.send(err))
})
router.get('/', (req, res) => {
	Channels.find(req.query)
		.then(channels => {
			res.send(channels)
		})
		.catch(err => res.send(err))
})

// Export
module.exports = router
