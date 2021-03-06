google.load('visualization', '1', {packages:['table','corechart']});

$( document ).ready(function() {
    $("#menu a").each(function() {
        $(this).hover(
            function(){
                $(this).addClass("secondcolor");
            },
            function(){
                $(this).removeClass("secondcolor");
            }
            );
    });

    $(".statscontainer").animate({
                opacity: 1,
            }, 
            700,
            function(){}
        );

    $('#apppicker').change(function() {
        var game = this.value;
        if (this.selectedIndex) {
            ///playerstats/:game
            $.get('/playerstats/' + game, function(data) {

                drawUserTable(data);

            });
        }
    });

    $('#gapppicker').change(function() {
        var platform = $("#gplatformpicker").val();
        var app = $("#gapppicker").val();
        obtainGraphData(platform, app);
    });
    $('#gplatformpicker').change(function() {
        var platform = $("#gplatformpicker").val();
        var app = $("#gapppicker").val();
        obtainGraphData(platform, app);
    });
    obtainGraphData(-1, -1);
    obtainPieStatData();
});

function drawUserTable(users) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Score');
    var rows = [];
    for (var i = 0; i<users.length; i++) {
        rows.push([users[i].user, users[i].score]);
    }
    data.addRows(rows);

    var table = new google.visualization.Table(document.getElementById('userlist'));
    table.draw(data, {showRowNumber: true});
};

function drawLineChart(table,descr,container) {
    var rows = [];
    rows.push(['Month',descr]);
    for (var i = 0; i<table.length; i++) {
        rows.push([table[i].month, table[i].count]);
    }

    var data = google.visualization.arrayToDataTable(rows);

    var options = {
        title: descr+' number',
        hAxis: {title: 'Months',  titleTextStyle: {color: 'red'}},
        colors: ['#86D17C']
    };

    var chart = new google.visualization.AreaChart(document.getElementById(container));
    chart.draw(data, options);
};

function drawPieChart(table,name,descr,container) {
    var rows = [];
    rows.push([name,descr]);
    for (var i = 0; i<table.length; i++) {
        rows.push([table[i].name, table[i].count]);
    }

    var data = google.visualization.arrayToDataTable(rows);

    var options = {
        title: descr+' number',
    };

    var chart = new google.visualization.PieChart(document.getElementById(container));
    chart.draw(data, options);
}


function obtainPieStatData() {
    $.get('/apppiestats', function(data) {
        var plat_inst = data[0];
        var app_inst = data[1];
        var plat_laun = data[2];
        var app_laun = data[3];
        drawPieChart(plat_inst, 'Platform', 'Installations', 'platinstchart');
        drawPieChart(app_inst, 'Applications', 'Installations', 'appinstchart');
        drawPieChart(plat_laun, 'Platform', 'Launches', 'platlaunchart');
        drawPieChart(app_laun, 'Applications', 'Launches', 'applaunchart');
    });
}

function obtainGraphData(platform, app) {
    $.get('/appstats/' + platform + '/' + app, function(data) {
        var installs = data[0];
        var launches = data[1];
        drawLineChart(installs,'Installations','installschart');
        drawLineChart(launches,'Launches','launcheschart');
    });
};