const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const dotenv = require('dotenv'); 
const bcrypt = require('bcrypt');

dotenv.config(); // Call dotenv.config() to load environment variables

const app = express();
const PORT = process.env.PORT || 3001;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
