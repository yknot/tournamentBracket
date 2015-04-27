/*jslint indent: 4 */
/*global $, document*/

function drawPool(p, pool, poolRecords) { 
    // create new pool div
    var newDiv = $("<div></div>").addClass("Pool");
    newDiv.attr("id", p);
    $("#Pools").append(newDiv);
    var header = $("<h2>Pool " + p + "</h2>");
    newDiv.append(header);

    // create pool in new div
    var newTable = $("<table></table>");

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
        row.append($("<td>" + pool[r] + ' (' + r + ')' + "</td>")); // name
        // .Wins .Losses .Ties
        row.append($("<td>" + poolRecords[r].Wins + "</td>")); // wins 
        row.append($("<td>" + poolRecords[r].Losses + "</td>")); // losses
        row.append($("<td>" + poolRecords[r].Ties + "</td>")); // ties
        
    }
    // add the new table to document
    newDiv.append(newTable);
}

function drawPoolPlay(p, games, pools) {
    var newDiv = $("<div></div>").addClass("PoolPlay");
    newDiv.attr("id", p);
    $("#PoolPlay").append(newDiv);
    var header = $("<h2>Pool " + p + "</h2>");
    newDiv.append(header);
    
     // create pool in new div
    var newTable = $("<table></table>");

    // add title row
    var toprow = $("<tr />");
    toprow.append($("<td>Date</td><td>Time</td><td>Field</td><td>Team 1</td><td>Team 2</td><td>Score</td>"));
    newTable.append($(toprow));
    
    for(var r in games){
        var row = $("<tr />");
        $(newTable).append(row);{}
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
    // do this automatically
    var poolRecords = [{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0},{"Wins":0, "Losses":0, "Ties":0}];
    
    // get the json file
    $.getJSON('chowdafest.json', function(data) {
        // for each item in PoolPlay (each game)
        $.each(data.PoolPlay, function(key, value){
            for(var g in value){
                // cast as int?
                if(value[g].Team1Score < value[g].Team2Score){
                    poolRecords[value[g].Team1].Wins += 1;
                    poolRecords[value[g].Team2].Losses += 1;
                }
                else if (value[g].Team1Score > value[g].Team2Score){
                    poolRecords[value[g].Team2].Wins += 1;
                    poolRecords[value[g].Team1].Losses += 1;
                }
            }
            console.log(poolRecords);
            drawPoolPlay(key, value, data.Pools);
        });
        $.each(data.Pools, function(key, value) {
            drawPool(key, value, poolRecords);
        });
    });
});