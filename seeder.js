const mongoose = require('mongoose');
const Vip = require('./models/VipLevel'); // Adjust the path as needed
const User = require('./models/User'); // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/vipdb', { useNewUrlParser: true, useUnifiedTopology: true });

const vipLevels = [
    {
        level: 1,
        depositAmountRange: { min: 0, max: 5000 },
        turnover: 0,
        maintainWeeklyTurnover: 0,
        benefits: {
            withdrawalTimePerDay: 1,
            withdrawalLimitPerDay: 10000
        }
    },
    {
        level: 2,
        depositAmountRange: { min: 5000, max: 10000 },
        turnover: 5000,
        maintainWeeklyTurnover: 20000,
        benefits: {
            withdrawalTimePerDay: 2,
            withdrawalLimitPerDay: 20000,
            dailySpin: 2
        }
    },
    {
        level: 3,
        depositAmountRange: { min: 10000, max: 50000 },
        turnover: 10000,
        maintainWeeklyTurnover: 20000,
        benefits: {
            withdrawalTimePerDay: 3,
            withdrawalLimitPerDay: 50000
        }
    },
    {
        level: 4,
        depositAmountRange: { min: 50000, max: 100000 },
        turnover: 50000,
        maintainWeeklyTurnover: 70000,
        benefits: {
            withdrawalTimePerDay: 5,
            withdrawalLimitPerDay: 100000,
            dailySpin: 1
        }
    },
    {
        level: 5,
        depositAmountRange: { min: 100000, max: 200000 },
        turnover: 100000,
        maintainWeeklyTurnover: 150000,
        benefits: {
            withdrawalTimePerDay: 8,
            withdrawalLimitPerDay: 400000,
            dailySpin: 1
        }
    },
    {
        level: 6,
        depositAmountRange: { min: 200000, max: 500000 },
        turnover: 0,
        maintainWeeklyTurnover: 0,
        benefits: {
            withdrawalTimePerDay: 1,
            withdrawalLimitPerDay: 10000,
            dailySpin: 1
        }
    }
];

const users = [
    {
        username: 'john_doe',
        deposits: [5000, 10000],
        weeklyTurnover: 15000
    },
    {
        username: 'jane_doe',
        deposits: [20000],
        weeklyTurnover: 30000
    },
    {
        username: 'alice',
        deposits: [50000],
        weeklyTurnover: 100000
    },
    {
        username: 'bob',
        deposits: [100000],
        weeklyTurnover: 200000
    }
];

const seedDatabase = async () => {
    try {
        // await Vip.deleteMany({});
        // await User.deleteMany({});
        
        await Vip.insertMany(vipLevels);
        await User.insertMany(users);
        
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();
