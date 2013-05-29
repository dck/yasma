google.load('visualization', '1', {packages:['table']});

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
        var app = this.value;
        var platform = ?_?;
        if (this.selectedIndex) {
            ///playerstats/:platform/:app
            $.get('/appstats/' + platfrom + '/' + app, function(data) {

                //drawUserTable(data);

            });
        }
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