module.exports = function (req,res,next) {
    console.log('hit here',req.session)
  if(req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};