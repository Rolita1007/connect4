class Connect4 {
  constructor(selector) {
    this.Rows = 6;
    this.Columns = 7;
    this.player = 'red';
    this.selector = selector;
    this.createGrid();
    this.setupEventListeners();  
  }

  //Creating the grid

  createGrid() {
    const $board = $(this.selector);
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
      const column = $(this).data('column');
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass(`red-chip`);
    });

    $board.on('mouseleave', '.column', function () {
      $('.column').removeClass(`red-chip`);
    });

    $board.on('click', '.column.empty', function() {
      const column = $(this).data('column');
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.removeClass('empty');
      $lastEmptyCell.addClass('red');
    });
  }
}