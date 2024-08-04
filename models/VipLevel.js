const mongoose = require('mongoose');

const VipLevelSchema = new mongoose.Schema({
    level: { type: Number, required: true, unique: true },
    depositAmountRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    turnover: { type: Number, required: true },
    maintainWeeklyTurnover: { type: Number, required: true },
    benefits: {
        withdrawalTimePerDay: { type: Number, required: true },
        withdrawalLimitPerDay: { type: Number, required: true },
        dailySpin: { type: Number, required: false },
    },
});

module.exports = mongoose.model('VipLevel', VipLevelSchema);
