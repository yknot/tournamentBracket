function drawPool(p, pool) { 
    // create new pool div
    var newDiv = $("<div></div>").addClass("Pool");
    newDiv.attr("id", p);
    $("#Pools").append(newDiv);

    // create pool in new div
    var newTable = $("<table></table>").addClass(p);

    // add title row
    var toprow = $("<tr />");
    toprow.append($("<td>Team</td><td>Wins</td><td>Losses</td><td>Ties</td>"));
    newTable.append($(toprow));


    // sort the teams based on seed
    Object.keys(pool).sort(function(a, b) { return pool[a] > pool[b]; });

    // print rows of table
    for(var r in pool){
        var row = $("<tr />");
        $(newTable).append(row);
        row.append($("<td>" + pool[r] + ' (' + r + ')' + "</td>"));
    }

    // add the new table to document
    newDiv.append(newTable);
}

function drawPoolPlay(p, games, pools) {
    var newDiv = $("<div></div>").addClass("PoolPlay");
    newDiv.attr("id", p);
    $("#PoolPlay").append(newDiv);
    
     // create pool in new div
    var newTable = $("<table></table>").addClass(p);

    // add title row
    var toprow = $("<tr />");
    toprow.append($("<td>Date</td><td>Time</td><td>Field</td><td>Team 1</td><td>Team 2</td><td>Score</td>"));
    newTable.append($(toprow));
    
    console.log(pools);
    
    for(var r in games){
        
        var row = $("<tr />");
        $(newTable).append(row);
        // format datetime
        row.append($("<td>" + games[r].Datetime.substring(5,10) +"</td>")); // date
        row.append($("<td>" + games[r].Datetime.substring(11,16) +"</td>")); // time
        row.append($("<td>" + games[r].Field + "</td>")); // field
        row.append($("<td>" + pools[p][games[r].Team1] + "</td>")); // team 1
        row.append($("<td>" + pools[p][games[r].Team2] +"</td>")); // team 2
        row.append($("<td>" + games[r].Team1Score + ' - ' + games[r].Team2Score +"</td>")); // score
        
    }
    
    
    newDiv.append(newTable);

}



$(document).ready(function() {
    var pools = [];
    $.getJSON('chowdafest.json', function(data) {
        $.each(data.PoolPlay, function(key, value){

            drawPoolPlay(key, value, data.Pools);
        });
        $.each(data.Pools, function(key, value) {
            drawPool(key, value);
        });
    });
});