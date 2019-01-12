/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = false;
  var piece = 0;
  //var coordinates = [0, 0];
  var boardSize = n;
  var workBoard = new Board({'n': n});
var trace = 0;
  var nextPosition = function (r, c, board, count) {
    trace++;
    console.log('trace - ' + trace)
    for (var row = r; row < n; row++) {
      for (var col = c + 1; col < n; col++) {
        board.togglePiece(row, col)
        console.log(row, col)
        //console.log('placed a piece');
        console.log(board)
        console.log(`placed a piece at r ${r} and  c ${c} with the board`, board.rows());
        if (checkConflicts.call(board)) {
          board.togglePiece(row, col);
          continue;
        }
        count++;
        // console.log(count)
        // console.log(count === n)
        if (count === n) return board;
        //if (row === n - 1 && col === n - 1 ) return board;
        //console.log(row, col)
        var tempBoard = nextPosition(row, col, board, count);
        if (!tempBoard) {
          board.togglePiece(row, col);
          count--;
        } else {
          return tempBoard;
        }
      }
    }
    return false;
  };
  var checkConflicts = function () {
    console.log(this)
    var a = this.hasAnyColConflicts();
    var b = this.hasAnyRowConflicts();
    var c = this.hasAnyMajorDiagonalConflicts();
    var d = this.hasAnyMinorDiagonalConflicts();
    console.log(a,b,c,d)
    if (!a && !b && !c && !d) {
      return false;
    }
    return true;
  };

  var tempBoard = nextPosition(0, -1, workBoard, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempBoard));
  if (n === 0) return new Board({'n':0});
  return tempBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = false;
  var piece = 0;
  //var coordinates = [0, 0];
  var boardSize = n;
  var workBoard = new Board({'n': n});

  var nextPosition = function (r, c, board, count) {
    for (var row = r; row < n; row++) {
      for (var col = c + 1; col < n; col++) {
        board.togglePiece(row, col);
        if (checkConflicts.call(board)) {
          board.togglePiece(row, col);
          continue;
        }
        count++;
        if (row === n - 1 && col === n - 1) return board;
        console.log(row, col)
        var tempBoard = nextPosition(row, col, board, count);
        if (!tempBoard) {
          board.togglePiece(row, col);
          count--;
        } else {
          return tempBoard;
        }
      }
    }
    return false;
  };
  var checkConflicts = function () {
    console.log(this)
    var a = this.hasAnyColConflicts();
    var b = this.hasAnyRowConflicts();
    var c = this.hasAnyMajorDiagonalConflicts();
    var d = this.hasAnyMinorDiagonalConflicts();
    console.log('queens')
    console.log(a,b,c,d)
    if (!a && !b && !c && !d) {
      return false;
    }
    return true;
  };

  var tempBoard = nextPosition(0, -1, workBoard, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempBoard));
  return tempBoard;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
