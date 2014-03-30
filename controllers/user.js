var async = require('async');

var getData = function(userid, callback){
    async.parallel({
        measurements: function(callback){
            console.log(userid);
                          connection.query('SELECT m.id, m.shortname, m.name, s.value, m.unit '+ 
                                           'FROM statistic s '+
                                           'JOIN measurement m ON s.measurement = m.id '+
                                           'JOIN (SELECT measurement, max(created_at) created '+
                                                 'FROM statistic '+
                                                 'GROUP BY measurement) max ON max.measurement = s.measurement AND max.created = s.created_at '+
                                           'WHERE s.user  = ? '+
                                           'GROUP BY s.measurement'
                                           , [userid],callback);
        },
        user: function(callback){
            connection.query('SELECT * FROM users WHERE id = ?', [userid],callback);
        }
    },
    function(error, results){
        if(error != null){
            console.log(error);
        }else{
            for(m in results.measurements[0]){
                results.measurements[0][m].value = results.measurements[0][m].value.toPrecision(4);
            }
            callback(results);
        }

    });
};

exports.content = function(client, data) {
    getData(data.id, function(results) {
        console.log(data.id);
        app.render('user.hjs', {user: results.user[0][0],
                                measurements: results.measurements[0]}, function(error, result){
            if(error == null){
                client.io.emit('recieved-content', {type: 'user',
                                                    id: data.id,
                                                    html: result});
            } else {
                console.log(error);
            }
        });
    });
};

exports.index = function(req, res) {
    connection.query('SELECT id FROM users WHERE name = ?', [req.params.name], function(err, result){
        if(err === null){
            if(result.length > 0){
                getData(result[0].id, function(results){
                    res.render('master_new', {user: results.user[0][0],
                                              measurements: results.measurements[0],
                                              partials: {content: 'user'}
                    });
                });
            }else{
                res.send('user not found');
            }
        } else {
            res.send('notok');
        }
    });
};
