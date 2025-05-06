const express = require('express');
const router = express.Router();
const { generateName } = require('../controllers/name.controller');
const { validateGenerateName } = require('../utils/validators');

router.post('/generate', validateGenerateName, generateName);

module.exports = router;
