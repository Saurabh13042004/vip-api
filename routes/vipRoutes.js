const express = require('express');
const router = express.Router();
const vipController = require('../controllers/vipController');

router.get('/', vipController.getVipLevels);
router.post('/', vipController.createVipLevel);
router.put('/:id', vipController.updateVipLevel);
router.delete('/:id', vipController.deleteVipLevel);

module.exports = router;
