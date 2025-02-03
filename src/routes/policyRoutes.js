const express = require('express');
const { createPolicy } = require('../controllers/policyController');

const router = express.Router();

router.post('/policies', createPolicy);

module.exports = router;
