module.exports.guard = ((req,res,next)=> {
    if (req.session.user) {
        next();
    } else {
        return res.redirect('/user/sign-in');
    }
});
