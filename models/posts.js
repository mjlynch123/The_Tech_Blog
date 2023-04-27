const { Model, DataTypes, Sequelize } = require('sequelize');

class Post extends Model {}

const sequelize = new Sequelize('blog_db', 'root', 'Password1', {
  host: 'localhost',
  dialect: 'mysql',
});

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

const posts = [
  {
    title: 'First post',
    body: 'This is my first post!',
    user_id: 1,
  },
  {
    title: 'Second post',
    body: 'This is my second post!',
    user_id: 1,
  },
  {
    title: 'Third post',
    body: 'This is my third post!',
    user_id: 1,
  },
];

const seedPost = async () => {
  try {
    await sequelize.sync({ force: true });
    await Post.bulkCreate(posts);
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    sequelize.close();
  }
};

seedPost();

module.exports = Post;