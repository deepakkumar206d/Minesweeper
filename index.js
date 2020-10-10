const arrayMines = new Array();
// Array matrix rows and columns.
const columns = 8;
const rows = 8;
const mines = 8;
let mineFlags;
let toDiscover;

function renderBlocks() {
    $('#Mines').html('');
    mineFlags = mines;
    toDiscover = columns * rows - mines;
    $('#gameBoard').width(columns * 35);
    $('#gameBoard').height(rows * 35);

    for (var i = 0; i < rows; i++) {
        arrayMines[i] = new Array();
        for (var j = 0; j < columns; j++) {
            arrayMines[i][j] = 0;
            $("#Mines").append("<input type='button' class='square' id=" + i + "_" + j + " value='' onclick='clickMine(" + i + "," + j + ")' />");
        }
        $("#Mines").append('<br>');
    }

    var i = 0;
    while (i < mines) {
        var x = Math.floor(Math.random() * rows);
        var y = Math.floor(Math.random() * columns);
        if (arrayMines[x][y] === 0) {
            arrayMines[x][y] = 1;
            i++;
        }
    }
}

$('#restartGame').on('click', function(e){
    renderBlocks();
});


function checkVictory() {
    if (toDiscover === 0) {
        for (var i = 0; i < rows; i++)
        for (var j = 0; j < columns; j++) {
            if (arrayMines[i][j] == 1) {
                $("#" + i + "_" + j).prop('value', "*");
                $("#" + i + "_" + j).css("color", "black");
            }
        }
        $("#" + i + "_" + j).attr('onclick', '');
        alert("Great, Please Restart the game");
        toDiscover = -1;
    }
}

function clickMine(i, j) {
    if (arrayMines[i][j] > 1) {
        switchFlag(i, j);
    } else if (arrayMines[i][j] == 1) {
        $("#" + i + "_" + j).addClass("active");
        showBombs();
        alert("Ooops, BOOM!");
    } else {
        $("#" + i + "_" + j).addClass("active");
        $("#" + i + "_" + j).attr('onclick', '');
        toDiscover--;
        var number = countMines(i, j);
        if (number !== 0) $("#" + i + "_" + j).prop('value', number);
        else for (var x = Math.max(0, i - 1); x <= Math.min(rows - 1, i + 1); x++)
        for (var y = Math.max(0, j - 1); y <= Math.min(columns - 1, j + 1); y++)
        if (arrayMines[x][y] < 2 && !$("#" + x + "_" + y).hasClass('active')) clickMine(x, y);

        checkVictory();
    }
}

function countMines(i, j) {
    var k = 0;
    for (var x = Math.max(0, i - 1); x <= Math.min(rows - 1, i + 1); x++)
    for (var y = Math.max(0, j - 1); y <= Math.min(columns - 1, j + 1); y++)
    if (arrayMines[x][y] == 1 || arrayMines[x][y] == 3) k++;
    return k;
}

function switchFlag(i, j) {
    if (!$("#" + i + "_" + j).hasClass('active')) {
        if (arrayMines[i][j] < 2) {
            if (mineFlags > 0) {
                arrayMines[i][j] += 2;
                $("#" + i + "_" + j).prop('value', "*");
                $("#" + i + "_" + j).css("color", "grey");
                mineFlags--;
            }
        } else {
            arrayMines[i][j] -= 2;
            $("#" + i + "_" + j).prop('value', "");
            $("#" + i + "_" + j).css("color", "");
            mineFlags++;
        }
    }
}

function showBombs() {
    for (var i = 0; i < rows; i++)
    for (var j = 0; j < columns; j++) {
        if (arrayMines[i][j] == 1) {
            $("#" + i + "_" + j).prop('value', "*");
            $("#" + i + "_" + j).css("font-size", "20px");
            $("#" + i + "_" + j).css("background-color", "grey");
        }
        $("#" + i + "_" + j).attr('onclick', '');
    }
}


renderBlocks();