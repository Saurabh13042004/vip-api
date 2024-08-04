const User = require('../models/User');
const VipLevel = require('../models/VipLevel');

const calculateVipLevel = async (user) => {
    const vipLevels = await VipLevel.find().sort({ level: 1 });

    let currentLevel = null;
    for (const vipLevel of vipLevels) {
        if (vipLevel.depositAmountRange.min <= user.deposits[user.deposits.length - 1] && user.deposits[user.deposits.length - 1] <= vipLevel.depositAmountRange.max) {
            if (user.weeklyTurnover >= vipLevel.maintainWeeklyTurnover) {
                currentLevel = vipLevel;
                break; 
            }
        }
    }

    return currentLevel;
};

exports.getUserVipLevel = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).populate('vipLevel');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentLevel = await calculateVipLevel(user);
        user.vipLevel = currentLevel._id;
        await user.save();

        res.json({ vipLevel: currentLevel });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addDeposit = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.deposits.push(req.body.amount);
        user.weeklyTurnover += req.body.amount; // Update weekly turnover
        await user.save();

        const currentLevel = await calculateVipLevel(user);
        if (currentLevel) {
            user.vipLevel = currentLevel._id;
            await user.save();
            res.json({ message: 'Deposit added', vipLevel: currentLevel });
        } else {
            res.json({ message: 'Deposit added, but no VIP level found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};