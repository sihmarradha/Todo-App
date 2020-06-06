const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

exports.getSignup = ((req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('signup', {
        title: 'TODO | SIGN UP'
    })
});

exports.getLogin = ((req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login', {
        title: 'TODO | LOGIN'
    })
});

exports.postSignup = ((req, res) => {
    let {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.redirect('back');
    }else {
        User.findOne({email: email}).then(user => {
            if (user) {
                console.log('user already exist');
                return res.redirect('back');
            }else {
                bcrypt.hash(password,10).then(hashPassword => {
                    User.create({
                        email: email,
                        password: hashPassword,
                        name: name
                    }).then(userCreated => {
                        console.log('User has been created..!!');
                        console.log('Now redirecting to /user/sing-in');
                        return res.redirect('/user/sign-in');
                    }).catch(err => {
                        console.log('Error while creating user', err);
                        return res.redirect('back');
                    })
                }).catch(err => {
                    console.log('Error while hashing password', err);
                    return res.redirect('back');
                });
            }
        }).catch(err => {
            console.log('Error while finding user ', err);
            return res.redirect('back');
        });
    }
});

exports.postLogin = ((req, res) => {
    let {email,password} = req.body;
    if (!email || !password) {
        return res.redirect('back');
    }
    User.findOne({email: email}).then(user=> {
        if (!user) {
            return res.redirect('back');
        }
        bcrypt.compare(password,user.password).then(matched=> {
            if (!matched) {
                return res.redirect('back');
            }
            req.session.user = user;
            req.session.save((err)=> {
               if (!err) {
                   return res.redirect('/');
               }
            });
        }).catch(err=> {
           console.log('Error while matching password', err);
        });
    }).catch(err=> {
        console.log('Error while finding user', err);
    });
});

exports.logout = ((req,res)=> {
    req.session.destroy((err)=> {
        if (!err) {
            return res.redirect('/');
        }
    });
});

exports.saveTodo = ((req,res)=> {
    let {todoName} = req.body;
    if (!todoName) {
        return res.redirect('back');
    }
    User.findOne({email:req.session.user.email}).then(user=> {
       user.todoArr.push({
           todoName: todoName
       });
       user.save().then(()=> {
           req.session.user.todoArr = user.todoArr;
           return res.redirect('back');
       }).catch(err=> {
          console.log('Cannot update todo', err);
       });
    }).catch(err=> {
       console.log('Cannot find user', err);
    });
});

exports.deleteTodo = ((req, res)=>{
    let { id } = req.query;
    if (id) {
        User.findOne({email:req.session.user.email}).then(user=> {
           user.todoArr =  user.todoArr.filter(todo=> {
              return (todo._id).toString() !== id;
            });
            user.save().then(()=> {
                req.session.user.todoArr = user.todoArr;
                return res.redirect('back');
            }).catch(err=> {
                console.log('Cannot update todo', err);
            });
        }).catch(err=> {
            console.log('Cannot find user', err);
        });
    }
});
