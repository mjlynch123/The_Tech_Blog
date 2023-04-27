const sequelize = require('../config/connection');
const User = require('../models/user');

const userData = [
  {
    username: 'johnsmith',
    email: 'johnsmith@example.com',
    password: 'password123',
  },
  {
    username: 'janesmith',
    email: 'janesmith@example.com',
    password: 'password456',
  },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\nDatabase sync\'d successfully\n');

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('\nSeed data added successfully\n');
  } catch (err) {
    console.log(err);
  }
};

seedDatabase();