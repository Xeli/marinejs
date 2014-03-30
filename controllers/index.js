exports.index = function(req, res){
    connection.query('SELECT * FROM users', function(err, docs) {
        res.render('master_new', { title: 'Express',
                                   users: docs,
                                   partials: {content: 'main'}
                                 }
        );

    });
};

exports.content = function(client, data) {
    connection.query('SELECT * FROM users', function(err, docs) {
        app.render('main', {users: docs}, function(html){
            client.emit('recieved-content', {type: 'main',
                                             id:   0,
                                             html: html});
        });
    });
};
