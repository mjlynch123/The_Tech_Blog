const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: 3306,
//   }
// );

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  dialect: 'mysql',
  protocol: 'mysql',
  port: 3306,
  logging: true //false
});

module.exports = sequelize;

const connection = mysql.createConnection({
  host: 'us-cdbr-east-02.cleardb.com',
  user: '<YOUR_USERNAME>',
  password: '<YOUR_PASSWORD>',
  database: '<YOUR_DATABASE_NAME>',
});

module.exports = sequelize;