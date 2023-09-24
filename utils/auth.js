const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    return res.status(401).redirect(redirectUrl + '?error=You must be logged in to access this page');
  }

  // User is logged in, continue to the next middleware or route handler
  next();
};

module.exports = withAuth;
