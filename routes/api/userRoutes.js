const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.name = newUser.name;
      req.session.logged_in = true;
      res.json(newUser);
    })

  } catch (err) {
    console.logg(err);
    res.status(500).json(err);
  }

});
// This is POST api/users/login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      }
    })
    const password = user.checkPassword(req.body.password);
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.name = user.name;
      req.session.logged_in = true;
      res.json(user);
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ models: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
