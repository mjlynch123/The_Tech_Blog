const { Model, DataTypes, Sequelize } = require('sequelize');

class Post extends Model {}

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// ! had to put seed data inside of models, otherwise I was getting an error saying that the tables couldn't be created
// ! This will seed on start
// const posts = [
//   {
//     title: 'How to add two numbers',
//     body: 'The way that you add two numbers is that you take one number and add it to the other one',
//     user_id: 1,
//   },
//   {
//     title: 'Why is code so difficult',
//     body: 'Nobody actually knows!',
//     user_id: 2,
//   },
//   {
//     title: 'How does ChatGPT work?',
//     body: 'Magic!',
//     user_id: 1,
//   },
//   {
//     title: 'How do I code?',
//     body: 'I have no idea!',
//     user_id: 2,
//   },
//   {
//     title: 'This is a test?',
//     body: 'This is a test to make sure that the new post button will stay fixed the bottom of the page!',
//     user_id: 2,
//   },
// ];

// const seedPost = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     await Post.bulkCreate(posts);
//     console.log('Data seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   }
// };

// seedPost();

module.exports = Post;