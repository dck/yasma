google.load('visualization', '1', {packages:['table']});

$( document ).ready(function() {
    $(".statscontainer").animate({
                opacity: 1,
            }, 
            2000,
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

function obtainGraphData(users) {
    var platform = $("#gplatformpicker").val();
    var app = $("#gapppicker").val();
    $.get('/appstats/' + platform + '/' + app, function(data) {

        console.log(data);

    });
};