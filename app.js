var path = require('path');
var express = require('express.io');
var mysql  = require('mysql');
app = express();
app.http().io();

//set up mysql
connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'marine_statistics_db'
});
connection.connect();

//set up environment
app.set('views', 'views');
app.set('view engine', 'hjs');

app.enable('view cache');
app.engine('hjs', require('hogan-express'));


//setup css/js
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


//routes
var routes = {
    main: require('./controllers/index.js'),
    user: require('./controllers/user.js'),
    measurement: require('./controllers/measurement.js')
};

app.get('/', routes.main.index);
app.get('/addMeasurement', routes.measurement.addGet);
app.get('/:name', routes.user.index);
app.get('/:name/measurement/:id', routes.measurement.index);

//socketio
app.io.configure(function() {
    app.io.enable('browser client minification');  // send minified client
    app.io.enable('browser client gzip');          // gzip the file
    app.io.set('log level', 3);                    // reduce logging
});
app.io.on('connection', function(socket) {
    console.log('connection');
    app.io.route('get-content', function(client){
        routes[client.data.type].content(client, client.data);
    });
    app.io.route('add-measurement', function(client){
        routes.measurement.addSocket(client, client.data);
    });
    app.io.route('get-measurement', function(client){
        routes.measurement.getMeasurements(client.data.userid, client.data.id, function(extra){
            client.io.respond(extra);
        });
    });
});

app.listen(7076);
