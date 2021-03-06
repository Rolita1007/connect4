class Connect4 {
  constructor(selector) {
    this.Rows = 6;
    this.Columns = 7;
    this.player = 'black';
    this.gameOver = false;
    this.onPlayerMove = function() {};
    this.selector = selector;
    this.createGrid();
    this.setupEventListeners();  
  }

  //Creating the grid

  createGrid() {
    const $board = $(this.selector);
    $board.empty();
    this.gameOver = false;
    this.player = 'black';
    for (let row = 0; row < this.Rows; row++) {
      const $row = $('<div>')
        .addClass('row');
      for (let column = 0; column < this.Columns; column++) {
        const $column = $('<div>')
          .addClass('column empty')
          .attr('data-column', column)
          .attr('data-row', row);
        $row.append($column);
      }
      $board.append($row);
    }
  }

  //Setting up the click event for every slot clicked

  setupEventListeners() {
    const $board = $(this.selector);
    const that = this;

    function findLastEmptyCell(column) {
      const cells = $(`.column[data-column='${column}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass('empty')) {
          return $cell;
        }
      }
      return null;
    }

    $board.on('mouseenter', '.column.empty', function() {
      if (that.gameOver) return;
      const column = $(this).data('column');
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass(`red-${that.player}`);
    });

    $board.on('mouseleave', '.column', function () {
      $('.column').removeClass(`red-${that.player}`);
    });

    $board.on('click', '.column.empty', function() {
      if (that.gameOver) return;
      const column = $(this).data('column');
      const row = $(this).data('row');
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.removeClass('empty');
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data('player', that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data('row'),
        $lastEmptyCell.data('column') 
      )
      if (winner) {
        that.gameOver = true;
        alert(`Game Over! Player ${that.player} has won!`);
        return;
      }

      that.player = (that.player === 'black') ? 'red' : 'black';
      that.onPlayerMove();
    });
  }

  //Check for the winner

  checkForWinner(row, column) {
    const that = this;

    function $getCell(i, j) {
      return $(`.column[data-row='${i}'][data-column='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = column + direction.j;
      let $next = $getCell(i, j);
      while (i >= 0 && i < that.Rows && j >= 0 && j < that.Columns &&
        $next.data('player') === that.player) {
          total++;
          i += direction.i;
          j += direction.j;
          $next = $getCell(i, j);
        }
        return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1+
        checkDirection(directionA) + checkDirection(directionB);
      if (total >= 4) {
        return that.player
      } else {
        return null;
      }
    }

    function checkDiagonalBottomLeftToTopRight() {
      return checkWin({i: 1, j: -1}, {i: 1, j: 1})
    }

    function checkDiagonalTopLeftToBottomRight() {
      return checkWin({i: 1, j: 1}, {i: -1, j: -1})
    }

    function checkVerticals() {
      return checkWin({i: -1, j:0}, {i: 1, j:0});
    }

    function checkHorizontals() {
      return checkWin({i: 0, j: -1}, {i: 0, j: 1});
    }
    return checkVerticals() || 
           checkHorizontals() ||
           checkDiagonalBottomLeftToTopRight() ||
           checkDiagonalTopLeftToBottomRight()
  }

  //restart button
  
  restart() {
    this.createGrid();
    this.onPlayerMove();
  }
}