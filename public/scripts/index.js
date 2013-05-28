$( document ).ready(function() {
    $('#apppicker').change(function() {
        var game = this.value;
        ///playerstats/:game
        $.get('/playerstats/' + game, function(data) {
            console.log(data);
        });
    });
});