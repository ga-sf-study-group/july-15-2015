$(function () {

  var setMines = function(boardSize, bombNums) { 
    var count = 0;
    var bombIndices = setRandomBombs(boardSize, bombNums);
    var array = [];
    for (var row = 0; row < boardSize; row++) {
      array.push([]);
      for (var col = 0; col < boardSize; col++) {
        if (bombIndices.indexOf(count) >= 0) {
          array[row].push(100);
          // console.log("Pushing bomb at " + row + "" + col + ". Count is " + count);
        }
        else {
          array[row].push(0);
        }
        count++;
      }
    }
    //console.log(array);
    return array;
  }

  var setRandomBombs = function(boardSize, bombNums) {
    var bombArray = [];
    
    while (bombArray.length < bombNums) {
      var bomb = Math.floor(Math.random() * boardSize * boardSize);
      if (bombArray.indexOf(bomb) < 0) {
        bombArray.push(bomb);
      }
    }
    console.log(bombArray);
    return bombArray;
  }
    
  var setBoard = function (boardSize) {
    createDivs(boardSize);
    var bombNums = boardSize * boardSize * 0.15;
    var gameArray = setMines(boardSize, bombNums);
    setNeighborValues(gameArray);
    console.log("This is the game array " + gameArray);
    setupClickHandler(gameArray, boardSize, bombNums);
    }


  // Create divs according to board size.
  var createDivs = function(num) {
    var height = (600 / num - 1);
    var width = (600 / num - 1);  
    console.log(height);
    console.log(width);
    for (var i = 1; i <= (num * num); i++) {
      $(".square").append("<div class='box' id='div_" + i + "' style='height:" + height + "px; width:" + width + "px'></div>");
    }
  }

  var inRange = function (row, col, boardSize) {
    return row < boardSize && row >= 0 && col < boardSize && col >= 0;
  }

  var setNeighborValues = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 100) {
          for (var row = i - 1; row <= i + 1; row++) {
            for (var col = j - 1; col <= j + 1; col++) {
              if (inRange(row, col, arr.length) && (arr[row][col] !== 100)) {
                arr[row][col]++;
              }
            }
          }
        }
      }
    }
  }

  var setupClickHandler = function (gameArray, boardSize, bombNums) {
    var boxes = $('.box');
    $('.box').click(function (e) {
      var clickedBox = e.target;
      var index = Array.prototype.indexOf.call(boxes, clickedBox);
      var row = Math.floor(index / boardSize);
      var col = index % boardSize;
      if (gameArray [row][col] === 100) {
        clickedBox.innerHTML = "BOMB"
        alert("GAME OVER!");
        window.location.reload();
      } else {
        reveal(boxes, row, col, gameArray);
      }
      if ($('.revealed').length === boardSize * boardSize - bombNums) {
        alert("CONGRATULATIONS!!!");
        window.location.reload();
      }
      console.log("This is revealed " + $('.revealed').length);
      console.log("This is index " + index);
    });
    $('.box').contextmenu(function (ev) {
      ev.preventDefault();
      var clickedBox = ev.target;
      clickedBox.innerHTML = "FLAG";
      return false;
    });
  } 


  var reveal = function (boxes, row, col, gameArray) {
    console.log("This is row " + row + " and col " + col);
    console.log("This is value of clicked " + gameArray[row][col]);
    var clickedBox = boxes[row * 10 + col];
    clickedBox.classList.add('revealed');
    var boardSize = gameArray[row].length;
    if (gameArray[row][col] === 0) {
      gameArray[row][col] = ""; 
      if (row !== 0) {
        reveal(boxes, row - 1, col, gameArray); // UP
        if (col !== 0 && gameArray[row - 1][col - 1] > 0) {
          reveal(boxes, row - 1, col - 1, gameArray); // UP LEFT
        }
        if (col !== boardSize - 1 && gameArray[row - 1][col + 1] > 0) {
          reveal(boxes, row - 1, col + 1, gameArray); // UP RIGHT
        }
      }
      if (row !== boardSize -1 ) {
        reveal(boxes, row + 1, col, gameArray); // DOWN
        if (col !== 0 && gameArray[row + 1][col - 1] > 0) {
          reveal(boxes, row + 1, col - 1, gameArray); // DOWN LEFT
        }
        if (col !== boardSize - 1 && gameArray[row + 1][col + 1] > 0) {
          reveal(boxes, row + 1, col + 1, gameArray); // DOWN RIGHT
        }
      }
      if (col !== 0) {
        reveal(boxes, row, col - 1, gameArray); // LEFT
      }
      if (col !== boardSize - 1) {
        reveal(boxes, row, col + 1, gameArray); // RIGHT
      }   
    }
    clickedBox.innerHTML = gameArray[row][col];
  }

setBoard(10);
})


