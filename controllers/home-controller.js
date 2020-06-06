module.exports.getHome =  ((req,res)=> {
    res.render('home', {
        title: 'TODO | HOME'
    });
});
