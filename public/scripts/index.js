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
            1000,
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
        obtainGraphData();
    });
    $('#gplatformpicker').change(function() {
        obtainGraphData();
    }); 

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
        rows.push([int(table[i].month), table[i].count]);
    }

    var data = google.visualization.arrayToDataTable(rows);

    var options = {
      title: descr+' number',
      hAxis: {title: 'Months',  titleTextStyle: {color: 'red'}}
    };

    var chart = new google.visualization.AreaChart(document.getElementById(container));
    chart.draw(data, options);
};

function obtainGraphData(users) {
    var platform = $("#gplatformpicker").val();
    var app = $("#gapppicker").val();
    $.get('/appstats/' + platform + '/' + app, function(data) {
        var installs = data[0];
        var launches = data[1];
        drawLineChart(installs,'Installations','installschart');
        drawLineChart(launches,'Launches','launcheschart');
    });
};