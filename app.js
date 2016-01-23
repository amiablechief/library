/* Setup Express */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var app = express();

/* Set application port to default (3000)
 * or use 5000 if not set
 */
var port = process.env.port || 5000;

/* Navigation elements */
var nav = [{
                Link:'/Books',
                Text: 'Book'
            },
            {
                Link:'/Authors',
                Text:'Author'
            },
            {
                Link: '/Library',
                Text: 'Library'
            },
        ];

/* Pass nav into bookRoutes function*/
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

/* Everything under the 'public' directory is served statically */
app.use(express.static('public'));

/* Use bookRoutes as the router for /Books */
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({}));
app.use(cookieParser());
app.use(session({secret: 'library', resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);

/* Set 'views' directory and 'view engine' */
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/auth', authRouter);

/* Home view */
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Pluralsight - Library Sample',
        nav: nav
    });
});

app.get('/books', function(req, res) {
    res.send('Hello books');
});

/* Console message when server started */
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
