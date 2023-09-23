const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  console.log('REQ ---> ', req , '\n', 'RES --> ', res);
  
  // IMPORTANT//!! Get all posts and JOIN with user data
    
  Post.findAll({
    attributes:[
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        models:Comment,
        attributes:['id', 'comment_content', 'user_id', 'post_id', 'created_at'],
        include:{
          models:User,
          attributes:['name', 'email']
        }
      },
      {
        models:User,
        attributes:['name', 'email']
      }
    ]
  }).then(data => {
    console.log(' data in home routes ', data);
  }).catch(err => {
    console.log('Error ', err);
  })
    

    // IMPORTANT//!! Serialize data so the template can read it
    /**const projects = projectData.map((project) => project.get({ plain: true }));**/

    //!! Pass serialized data and session flag into template
    
    /*res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
    */

  
});

router.get('/post/:id', async (req, res) => {
  try {
    /*
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          models: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
    */
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    /*const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ models: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
    */
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
