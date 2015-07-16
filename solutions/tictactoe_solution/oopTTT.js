$(function() {

  // Define a player Constructor
  // A Player has two attributes: a weight and a symbol.
  // the weight is the numerical value representation of
  // the a Player. X is 1 and O is -1.
  // the symbol is a string representation for X and O.
  function Player() {
    this.weight = Player.pm;
    this.symbol = this.weight === 1 ? "X" : "O";

    Player.pm *= -1;
  };

  // Player.pm is a Class attribute that stores
  // the weight that cycles every two 
  // instantiations of the Player object
  Player.pm = 1;

  // Define a Board Constructor
  // The Board constructor has 2 attributes: currentPlayer and scoreBoard
  // the scoreBoard is a numerical represenation of the tictactoe board
  // the currentPlayer attribute stores who the current player is.
  function Board() {
    this.scoreBoard = [[0,0,0],[0,0,0],[0,0,0]];
  };

  // Add prototype method to set who the next player is
  // Use an ivff that instantiates two new players, sets
  // the currentPlayer attribute to the first player "X"
  // declares a boolean turn, and returns a function that
  // negates turn and toggles currentPlayer between "X"
  // and "O". nextPlayer returns an instance of Board.
  Board.prototype.nextPlayer = (function(player) {
    var p1 = new player();
    var p2 = new player();
    var turn = true;
    return function() {
      this.currentPlayer = this.currentPlayer || p1;
      turn = !turn;
      this.currentPlayer = turn ? p2 : p1;
      if (arguments[0] && this.currentPlayer === p1) {
        this.nextPlayer();
      }
      return this;
    };
  })(Player);


  // Convert a array index to matrix id
  // trackMove is a function that takes in an integer
  // id, an array index, and converts then it to a
  // matrix index (e.g. 0 becomes [0,0], 4 becomes [1,1])
  // and finally assigns -1 or 1 to the appropriate location
  // in the scoreBoard.
  // the method returns this so we can do method chaining
  Board.prototype.trackMove = function(id) {
    var quot = Math.floor(id/3);
    var rem = id % 3;
    this.scoreBoard[quot][rem] = this.currentPlayer.weight;
    return this;
  };

  // Add a prototype method to fill in the score board
  // fill toggles the player and tracks the move on the score board
  Board.prototype.fill = function(id) {
    this.nextPlayer().trackMove(id);

  };


  // Add winner method
  Board.prototype.winner = function() {
    var lines = [];
    var dia1 = 0;
    var dia2 = 0;
    var isThree = false;

    this.scoreBoard.forEach(function(_el,_id,_arr) {
      var col = 0;
      var row = 0;
      _el.forEach(function(el,id,arr) {
        col += _arr[_id][id];
        row += _arr[id][_id];
      });
      if (Math.abs(col) == 3 || Math.abs(row) == 3) {
        isThree = true;
      } else {
        dia1 += _arr[_id][_id];
        dia2 += _arr[2-_id][2-_id];
      }
    });
    return (isThree || Math.abs(dia1) === 3 || Math.abs(dia2) === 3);
  };

  // Define a TicTacToe constructor that takes in two parameters:
  // a Board and the dom element with id #board
  // The constructor runs its `init` method on th
  function TicTacToe(boardConstructor, boardId, resetId) {
    var board = new boardConstructor("X","O");
    var $dom = $(boardId);
    var $reset = $(resetId);
    this.initGame(board, $dom, $reset);
    this.initReset(board, $dom, $reset);
  };

  // The `init` method take two parameters: an instance of a Board,
  // and an jquery object for the dom element with id `#board`
  TicTacToe.prototype.initGame = function(jsBoard, domBoard, reset) {
    var $boxes = domBoard.children('.box').html('&nbsp;').removeClass('X O');
    $boxes.click(function(evnt) {
      var el = evnt.target;
      var id = Array.prototype.indexOf.call($boxes, el);

      // Fill the javascript board
      jsBoard.fill(id);

      // Fill the Dom board
      $(el).html(jsBoard.currentPlayer.symbol).addClass(jsBoard.currentPlayer.symbol).off('click');
      var hasWinner = jsBoard.winner();
      if (hasWinner) {
        alert(jsBoard.currentPlayer.symbol + " Has won the game");
        reset.trigger('click');
      }
    });

  };

  // Initreset resets the board
  TicTacToe.prototype.initReset = function(jsBoard, $dom, $reset) {
    $reset.click(function(evnt) {
      jsBoard.nextPlayer(true);
      $dom.children('.box').off('click');
      $reset.off('click');
      TTT = TicTacToe.new();
    });
  };

  TicTacToe.new = function() {
    return new TicTacToe(Board,'#board','#reset');
  };

  var TTT = new TicTacToe(Board, '#board', '#reset');

});
