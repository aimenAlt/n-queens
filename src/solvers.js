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
  var nextPosition = function (r, c, board, count) {
    for (var row = r; row < n; row++) {
      for (var col = c + 1; col < n; col++) {
        board.togglePiece(row, col);
        if (checkConflicts()) {
          board.togglePiece(row, col);
          continue;
        }
        count++;
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
    //run all full tests on the board
    return false;
  };
  
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      workBoard.togglePiece(row, col);
      if (checkConflicts()) {
        workBoard.togglePiece(row, col);
        continue;
      }
      piece++;
      var tempBoard = nextPosition(row, col, workBoard, piece);
      if (!tempBoard) {
        workBoard.togglePiece(row, col);
        piece--;
      } else {
        return tempBoard;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
