var setUpChart = function(context, content, div, data) {
    if(data.extra === undefined){
        context.socketio.emit('get-measurement', {id: data.id, userid: 1}, function(extra){
            data.extra = extra;
            setUpChart2(context, content, div, data);
        });
    }else{
        setUpChart2(context, content, div, data);
    }
};

var setUpChart2 = function(context, content, div, data) {
    var chart;
    setTimeout(function() {
        chart = div.find('.chart').highcharts({
            chart: {
                type: 'spline',
            backgroundColor: null,
            },
            title: {
                text: ''
            },
            series: [{
                data: data.extra.measurementPoints,
                name: data.extra.measurement.shortname
            }],
            xAxis: {
                type: 'datetime',
            tickColor: 'white',
            },
            yAxis: {
                tickColor: '#FFF',
            tickColor: '#FFF',
            labels: {
                style: {
                    color: '#FFF'
                }
            },
            title: {
                text: data.extra.measurement.unit,
                rotation: 0
            },
            plotBands: {
                color: '#70FF8f',
                from: data.extra.measurement.preferedMin,
                to: data.extra.measurement.preferedMax
            }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        });
    }, 1000);

    context.socketio.on('chartUpdate-'+data.id, function(data){
        chart.highcharts().series[0].addPoint(data.measurement, true, true);
    });
}
