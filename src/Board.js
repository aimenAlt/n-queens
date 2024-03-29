// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        // this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        // this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
        this.hasMajorDiagonalConflictAt(rowIndex, colIndex) ||
        this.hasMinorDiagonalConflictAt(rowIndex, colIndex)
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    getCol: function(colIndex) {
      var array = [];
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        array.push(board[i][colIndex]);
      }
      return array;
    },

    getMajor: function(row = 0, col = 0) {
      
      var board = this.rows();
      var size = board.length;
      if (col === 0) {
        var rowArr = [];
        for (var j = 0; j < size - row; j++) {
          rowArr.push(board[j + row][j]);
        }
        return rowArr;
      } else {
        var rowArr = [];
        for (var j = 0; j < size - col; j++) {
          rowArr.push(board[j][j + col]);
        }
        return rowArr;
      }
    },

    getMinor: function(row = 0, col = 0) {
      var board = this.rows();
      var size = board.length;
      if (col === 0) {
        var rowArr1 = [];
        for (var j = 0; j <= row; j++) {
          rowArr1.push(board[row - j][j]);
        }
        return rowArr1;
      } else {
        var rowArr2 = [];
        for (var j = 0; j < size - col; j++) {
          rowArr2.push(board[size - j - 1][col + j]);
        }
        return rowArr2;
      }
    },

    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      return checkArray(row); // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      if (this.get(0) === undefined) {
        return false;
      }
      var currentBoardWidth = this.get(0).length; // check if an empty board
      for (var i = 0; i < currentBoardWidth; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var col = this.getCol(colIndex);
      return checkArray(col);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var currentBoardHeight = this.rows().length;
      for (var i = 0; i < currentBoardHeight; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(row, col) {
      if (row > col) {
        row = row - col;
        col = 0;
      } else {
        col = col - row;
        row = 0;
      }
      //console.log(row, col)
      return checkArray(this.getMajor(row, col)); // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.rows().length;
      for (var i = 0; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i, 0)) {
          return true;
        }
      }
      for (var i = 0; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(0, i)) {
          return true;
        }
      }
      return false; // fixme
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(row, col) {
      var size = this.rows().length - 1;
      if (row + col >= size) {
        col = row + col - size;
        row = size;
      } else {
        row = row + col;
        col = 0;
      }
      return checkArray(this.getMinor(row, col)); // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.rows().length;
      for (var i = 0; i < size; i++) {
        if (this.hasMinorDiagonalConflictAt(i, 0)) {
          return true;
        }
      }
      for (var i = 0; i < size; i++) {
        if (this.hasMinorDiagonalConflictAt(size, i)) {
          //console.log(i, "column in return true ");
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var checkArray = function(array) {
    if (Array.isArray(array)) {
      var found = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] && found) {
          return true;
        } else if (array[i] && !found) {
          found = true;
        }
      }
    }
    return false;
  };

}());
