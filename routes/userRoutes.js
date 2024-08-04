const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:username/vip', userController.getUserVipLevel);
router.post('/:username/deposit', userController.addDeposit);

module.exports = router;
