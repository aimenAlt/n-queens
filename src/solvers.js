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
  var boardSize = n;
  var workBoard = new Board({'n': n});
  var nextPosition = function (r, c, board, count) {
    var trigger = 0;
    for (var row = 0; row < n; row++) {
      if (trigger === 0) {
        trigger = 1;
        row = r;
      }
      for (var col = 0; col < n; col++) {
        if (trigger === 1) {
          trigger = 2;
          col = c;
          continue;
        }
        this.togglePiece(row, col);
        if (checkConflicts.call(this)) {
          this.togglePiece(row, col);
          continue;
        }
        count++;
        if (count === n) {
          return this;
        }
        var tempBoard1 = nextPosition.call(this, row, col, workBoard, count);
        if (!tempBoard1) {
          this.togglePiece(row, col);
          count--;
        } else {
          return tempBoard1;
        }
      }
    }
    return false;
  };
  var checkConflicts = function () {
    var a = this.hasAnyColConflicts();
    var b = this.hasAnyRowConflicts();
    if (!a && !b) {
      return false;
    }
    return true;
  };

  var tempBoard = nextPosition.call(workBoard, 0, -1, workBoard, 0);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempBoard));

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
  var boardSize = n;
  var workBoard = new Board({'n': n});
  var nextPosition = function (r, c, board, count) {
    var trigger = 0;
    for (var row = 0; row < n; row++) {
      if (trigger === 0) {
        trigger = 1;
        row = r;
      }
      for (var col = 0; col < n; col++) {
        if (trigger === 1) {
          trigger = 2;
          col = c;
          continue;
        }
        this.togglePiece(row, col);
        if (checkConflicts.call(this)) {
          this.togglePiece(row, col);
          continue;
        }
        count++;
        if (count === n) {
          return this;
        }
        var tempBoard1 = nextPosition.call(this, row, col, workBoard, count);
        if (!tempBoard1) {
          this.togglePiece(row, col);
          count--;
        } else {
          return tempBoard1;
        }
      }
    }
    return false;
  };
  var checkConflicts = function () {
    var a = this.hasAnyColConflicts();
    var b = this.hasAnyRowConflicts();
    var c = this.hasAnyMajorDiagonalConflicts();
    var d = this.hasAnyMinorDiagonalConflicts();
    if (!a && !b && !c && !d) {
      return false;
    }
    return true;
  };
  var tempBoard = nextPosition.call(workBoard, 0, -1, workBoard, 0);
  if (!tempBoard) {
    return workBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(tempBoard));
  return tempBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
