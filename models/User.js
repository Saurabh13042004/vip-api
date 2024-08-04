const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    deposits: [{ type: Number, required: true }],
    weeklyTurnover: { type: Number, required: true },
    vipLevel: { type: mongoose.Schema.Types.ObjectId, ref: 'VipLevel' },
});

module.exports = mongoose.model('User', UserSchema);
