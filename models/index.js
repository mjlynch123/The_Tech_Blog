const Post = require('./posts');
const User = require('./user');


User.hasMany(Post, {
  foreignKey: 'post_id',
});

Post.belongsTo(User, {
  foreignKey: 'post_id',
});

module.exports = { Post, User };