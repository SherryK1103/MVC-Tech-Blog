const { User } = require('../models');

const userData = [
  {
    name: 'John',
    email:'john@me.com',
    password:'loveCoding'
  },
  {
    name: 'Selena',
    email:'selena@me.com',
    password:'hateCoding'
  },
  {
    name: 'Mike',
    email:'mike@me.com',
    password:'loveSwimming'
  },
  {
    name: 'Tiffany',
    email:'tiffany@me.com',
    password:'hateSwimming'
  },
  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
