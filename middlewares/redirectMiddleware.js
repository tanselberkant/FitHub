// Controlling if user signed in , it should block router go in 'login' & 'register' page...

module.exports = (req,res,next) => {
    if(req.session.userID) {
        return res.redirect('/');
    }
    next();
}