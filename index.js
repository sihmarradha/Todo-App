const express = require('express');
const path = require('path');
const port = process.env.port || 8001;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./config/db');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(session({
    'secret': 'programming',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 10
    },
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use((req,res,next)=> {
    res.locals.user = req.session.user;
    next();
});

app.use('/',require('./routes'));

app.listen(port,(err)=> {
    if (!err) {
        console.log(`Server started on port : ${port}`);
    }
});
