var async = require('async');
var getData = function(userid, measurementid, callback){
    async.parallel({
        statistics: function(callback){
            connection.query('SELECT created_at, value FROM statistic WHERE measurement = ? ORDER BY created_at',
                [measurementid], function(err, result) {
                if(err != null){
                    callback(err, result);
                    return;
                }
                var ret = [];
                for (d in result) {
                    ret[ret.length] = [result[d].created_at*1000, result[d].value];
                }
                callback(err, ret);
            });
        },
        measurement: function(callback){
            connection.query('SELECT id, name, preferedMin, preferedMax, shortname, unit FROM measurement WHERE id = ?',[measurementid], callback);
        },
    },
    function(error, results) {
        console.log(error);
        callback(results);
    });
};

exports.getMeasurements = function(userid, measurement, callback){
    getData(userid, measurement, function(results){
        callback({
            measurement: results.measurement[0][0],
            measurementPoints: results.statistics
        });
    });
}

exports.content = function(client, data){
    getData(data.userid, data.id, function(results) {
        app.render('measurement.hjs', {measurement: results.measurement[0][0]}, function(error, html) {
            if (error === null) {
                client.io.join('user-'+data.userid);
                client.socket.emit('recieved-content', {
                    type: 'measurement',
                    id: data.id,
                    html: html,
                    extra: {measurement: results.measurement[0][0],
                           measurementPoints: results.statistics}
                });
            }
        });
    });
};

exports.index = function(req, res) {
    connection.query('SELECT * FROM users WHERE name = ?', [req.params.name], function(err, result){
        var user = result[0];
        var measurement = req.params.id;
        getData(user.id, measurement, function(results){
            console.log(results.measurement[0][0]);
            res.render('master_new', {measurement: results.measurement[0][0],
                                      user: user,
                                      partials: {content: 'measurement'}});
                                      
        });
    });
};

exports.addGet = function(req, res) {
    add(
        req.query.user, 
        req.query.measurement, 
        req.query.value, function() {
        res.send('OK');
    });
};

exports.addSocket = function(client, data){
    add(data.user, data.measurement, data.value, function(){});
};

var add = function(user, measurement, value, callback){
    connection.query('INSERT INTO statistic(measurement, created_at, value, user)'+
                     'VALUES(?, UNIX_TIMESTAMP(), ?, ?)',
                     [measurement, value, user], 
                     function(error, result){
                         if(error === null) {
                             app.io.broadcast('chartUpdate-' + measurement, 
                                 {measurement: [Date.now(), value*1],
                                  user: user});
                             callback();
                         }
                     }
    );
};
