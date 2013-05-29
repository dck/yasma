$( document ).ready(function() {
    $('#apppicker').change(function() {
        var game = this.value;
        if (this.selectedIndex) {
            ///playerstats/:game
            $.get('/playerstats/' + game, function(data) {
                console.log(data);
                var idhead = document.createElement("div")
                idhead.className = "idhead";
                idhead.innerHTML = "Place";
                var namehead = document.createElement("div")
                namehead.className = "namehead";
                namehead.innerHTML = "Name";
                var scorehead = document.createElement("div")
                scorehead.className = "scorehead";
                scorehead.innerHTML = "Score";
                var clear = document.createElement("div")
                clear.id = "clear";
                $("#userlist").append(idhead).append(namehead).append(scorehead).append(clear);
                
            });
        }
    });
});