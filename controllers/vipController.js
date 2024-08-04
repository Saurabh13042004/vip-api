const VipLevel = require('../models/VipLevel');

exports.getVipLevels = async (req, res) => {
    try {
        const vipLevels = await VipLevel.find();
        res.json(vipLevels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createVipLevel = async (req, res) => {
    const vipLevel = new VipLevel({
        level: req.body.level,
        depositAmountRange: {
            min: req.body.depositAmountRange.min,
            max: req.body.depositAmountRange.max,
        },
        turnover: req.body.turnover,
        maintainWeeklyTurnover: req.body.maintainWeeklyTurnover,
        benefits: {
            withdrawalTimePerDay: req.body.withdrawalTimePerDay,
            withdrawalLimitPerDay: req.body.withdrawalLimitPerDay,
            dailySpin: req.body.dailySpin,
        },
    });

    try {
        const newVipLevel = await vipLevel.save();
        res.status(201).json(newVipLevel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateVipLevel = async (req, res) => {
    try {
        const vipLevel = await VipLevel.findById(req.params.id);
        if (!vipLevel) {
            return res.status(404).json({ message: 'VIP Level not found' });
        }

        vipLevel.level = req.body.level || vipLevel.level;
        vipLevel.depositAmountRange = {
            min: req.body.depositAmountRange.min || vipLevel.depositAmountRange.min,
            max: req.body.depositAmountRange.max || vipLevel.depositAmountRange.max,
        };
        vipLevel.turnover = req.body.turnover || vipLevel.turnover;
        vipLevel.maintainWeeklyTurnover = req.body.maintainWeeklyTurnover || vipLevel.maintainWeeklyTurnover;
        vipLevel.benefits = {
            withdrawalTimePerDay: req.body.withdrawalTimePerDay || vipLevel.benefits.withdrawalTimePerDay,
            withdrawalLimitPerDay: req.body.withdrawalLimitPerDay || vipLevel.benefits.withdrawalLimitPerDay,
            dailySpin: req.body.dailySpin || vipLevel.benefits.dailySpin,
        };

        const updatedVipLevel = await vipLevel.save();
        res.json(updatedVipLevel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteVipLevel = async (req, res) => {
    try {
        const vipLevel = await VipLevel.findById(req.params.id);
        if (!vipLevel) {
            return res.status(404).json({ message: 'VIP Level not found' });
        }

        await vipLevel.remove();
        res.json({ message: 'VIP Level deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
