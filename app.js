/* Setup Express */
var express = require('express');
var app = express();

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
            }
        ];
/* Pass nav into bookRoutes function*/
var bookRouter = require('./src/routes/bookRoutes')(nav);
/* Use bookRoutes as the router for /Books */
app.use('/Books', bookRouter);

/* Set application port to default (3000)
* or use 5000 if not set
*/
var port = process.env.port || 5000;

/* Everthing under the 'public' directory is served statically */
app.use(express.static('public'));

/* Set 'views' directory and 'view engine' */
app.set('views', './src/views');
app.set('view engine', '.ejs');

/* Home view */
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Pluralsight - Library Sample',
        nav: nav
    });
});

/* Console message when server started */
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});
