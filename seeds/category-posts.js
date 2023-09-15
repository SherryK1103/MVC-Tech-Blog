const { Post } = require('../models');

const postData = [
  {
    post_content: 'hello, this is the post',
    title: 'post title',
    user_id: 1
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;