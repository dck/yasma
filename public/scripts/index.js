google.load('visualization', '1', {packages:['table']});

$( document ).ready(function() {
    $('#apppicker').change(function() {
        var game = this.value;
        if (this.selectedIndex) {
            ///playerstats/:game
            $.get('/playerstats/' + game, function(data) {
                console.log(data);
                // var idhead = document.createElement("div")
                // idhead.className = "idhead";
                // idhead.innerHTML = "Place";
                // var namehead = document.createElement("div")
                // namehead.className = "namehead";
                // namehead.innerHTML = "Name";
                // var scorehead = document.createElement("div")
                // scorehead.className = "scorehead";
                // scorehead.innerHTML = "Score";
                // var clear = document.createElement("div")
                // clear.id = "clear";
                // $("#userlist").append(idhead).append(namehead).append(scorehead).append(clear);

                drawUserTable();
            });

        }
    });
});


function drawUserTable(data) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time Employee');
    data.addRows([
        ['Mike',  {v: 10000, f: '$10,000'}, true],
        ['Jim',   {v:8000,   f: '$8,000'},  false],
        ['Alice', {v: 12500, f: '$12,500'}, true],
        ['Bob',   {v: 7000,  f: '$7,000'},  true]
    ]);


    var table = new google.visualization.Table(document.getElementById('userlist'));
    table.draw(data, {showRowNumber: true});

};