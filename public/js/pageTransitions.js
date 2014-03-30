var currentContent = null;

function addMainPageTransition(context, content) {
    var initialDiv = content.children(':first');
    var data = {
        type: initialDiv.attr('data-type'),
        id: initialDiv.attr('data-id'),
        url: initialDiv.attr('data-url')
    }
    window.history.replaceState(data, data.type, data.url);

    currentContent = initialDiv;
    addContentBinds[data.type].fn(context, content, initialDiv, data);
    addContentBinds[data.type].loadcb(initialDiv);

    context.socketio.on('recieved-content', function(data){
        var html = $($.parseHTML(data.html.trim()));
        html.hide();
        content.append(html);
        addContentBinds[data.type].fn(context, content, html, data);
        transition(currentContent, html, addContentBinds[data.type].loadcb);
    });
    content.on('click', '.transition', function(e){
        var node = $(this);
        var data = {
            type:  node.attr('data-type'),
            id:    node.attr('data-id'),
            extra: node.attr('data-extra'),
            url:   node.attr('data-url')
        };
        window.history.pushState(data, data.type, data.url);
        fireTransition(context, content, data);
        return false;
    });
    window.addEventListener('popstate', function(event) {
        if(event.state !== null) {
            fireTransition(context, content, event.state);
        }
    });
};

var fireTransition =  function(context, content, data){
    console.log(data.type + ' - transition');
    var to = content.children('.'+data.type);
    var loaded = false;

    to.each(function(){
        if($(this).attr('data-id') == data.id){
            transition(currentContent, $(this), addContentBinds[data.type].loadcb);
            loaded = true;
        }
    });
    if (loaded == false) {
        context.socketio.emit('get-content', {
            id: data.id,
            type: data.type,
            extra: data.extra
        });
    }
    return false;
};

function transition(from, to, callback) {
    from.addClass("animated bounceOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        from.removeClass("animated bounceOutRight");
        from.hide();
    });

    to.addClass("animated bounceInLeft").show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        to.removeClass("animated bounceInLeft");
    });
    if(callback != undefined) {
        callback(to);
    }
    currentContent = to;
}

var addContentBinds = {
    main: {fn: function(){},
           loadcb: function(){}
    },
    user: {fn: function(context, content, div) {
                   div.find('.polygon').click(function(e) {
                       context.socketio.emit('measurement-get', {userid: div.attr('data-userid'),
                                                                 measuremenid: $(this).attr('data-measurementid')});
                   });
               },
           loadcb: function(div){
               $.cnt1=0;
               $.cnt2=0;
               $.cnt3=0;
               runRes(small, medium, true,div);
           }
    },
    measurement: {fn: setUpChart,
                  loadcb:  function(div){
                  }
    }
}
