/*jslint indent: 4 */
/*global $, document*/

function drawPool(p, pool, poolRecords) {
    "use strict";
    var newDiv, header, newTable, toprow, r, row;
    // create new pool div
    newDiv = $("<div></div>").addClass("Pool");
    newDiv.attr("id", p);
    $("#Pools").append(newDiv);
    header = $("<h2>Pool " + p + "</h2>");
    newDiv.append(header);

    // create pool in new div
    newTable = $("<table></table>");

    // add title row
    toprow = $("<tr />");
    toprow.append($("<td>Team</td><td>Wins</td><td>Losses</td><td>Ties</td>"));
    newTable.append($(toprow));

    // sort the teams based on seed
    Object.keys(pool).sort(function (a, b) { return pool[a] > pool[b]; });

    // print rows of table
    for (r in pool) {
        row = $("<tr />");
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
    "use strict";
    var newDiv, header, newTable, toprow, r, row;
    
    newDiv = $("<div></div>").addClass("PoolPlay");
    newDiv.attr("id", p);
    $("#PoolPlay").append(newDiv);
    header = $("<h2>Pool " + p + "</h2>");
    newDiv.append(header);
    
     // create pool in new div
    newTable = $("<table></table>");

    // add title row
    toprow = $("<tr />");
    toprow.append($("<td>Date</td><td>Time</td><td>Field</td><td>Team 1</td><td>Team 2</td><td>Score</td>"));
    newTable.append($(toprow));
    
    for (r in games) {
        row = $("<tr />");
        $(newTable).append(row);
        // format datetime
        row.append($("<td>" + games[r].Datetime.substring(5, 10) + "</td>")); // date
        row.append($("<td>" + games[r].Datetime.substring(11, 16) + "</td>")); // time
        row.append($("<td>" + games[r].Field + "</td>")); // field
        row.append($("<td>" + pools[p][games[r].Team1] + "</td>")); // team 1
        row.append($("<td>" + pools[p][games[r].Team2] + "</td>")); // team 2
        row.append($("<td>" + games[r].Team1Score + ' - ' + games[r].Team2Score + "</td>")); // score
    }
    newDiv.append(newTable);
}

$(document).ready(function () {
    "use strict";
    var poolRecords, n, i, g;
    
    poolRecords = [];
    n = 0;
    
    // get the json file
    $.getJSON('chowdafest.json', function (data) {
        
        $.each(data.Pools, function (key, value) {
            n += Object.keys(value).length;   
        })
        
        for (i = 0; i < n+1; i += 1) {
            poolRecords.push({"Wins": 0, "Losses": 0, "Ties": 0});
        }
        
        // for each item in PoolPlay (each game)
        $.each(data.PoolPlay, function (key, value) {
            for (g in value) {
                // cast as int?
                if (value[g].Team1Score < value[g].Team2Score) {
                    poolRecords[value[g].Team1].Wins += 1;
                    poolRecords[value[g].Team2].Losses += 1;
                } else if (value[g].Team1Score > value[g].Team2Score) {
                    poolRecords[value[g].Team2].Wins += 1;
                    poolRecords[value[g].Team1].Losses += 1;
                }
            }
            drawPoolPlay(key, value, data.Pools);
        });
        $.each(data.Pools, function (key, value) {
            drawPool(key, value, poolRecords);
        });
    });
});