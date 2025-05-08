const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribe.controller');

router.post('/', subscribeController.subscribeUser);
router.get('/', subscribeController.showSubscribers);

module.exports = router;
