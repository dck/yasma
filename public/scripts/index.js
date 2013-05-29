google.load('visualization', '1', {packages:['table','corechart']});

$( document ).ready(function() {
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

function drawLineChart(table) {
    var rows = [];
    rows.push(['Month','Installations']);
    for (var i = 0; i<table.length; i++) {
        rows.push([i, table[i].count);
    }

    var data = google.visualization.arrayToDataTable(rows);

    var options = {
      title: 'Installations number',
      hAxis: {title: 'Time',  titleTextStyle: {color: 'red'}}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('graphcontainer'));
    chart.draw(data, options);
};

function obtainGraphData(users) {
    var platform = $("#gplatformpicker").val();
    var app = $("#gapppicker").val();
    $.get('/appstats/' + platform + '/' + app, function(data) {
        console.log(data);
        drawLineChart(data);
    });
};