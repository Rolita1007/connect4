class Connect4 {
  constructor(selector) {
    this.Rows = 6;
    this.Columns = 7;
    this.selector = selector;
    this.createGrid();
      
     
  }

    //Creating the grid

  createGrid() {
    const $board = $(this.selector);
    for (let row = 0; row < this.Rows; row++) {
      const $row = $('<div>')
        .addClass('row');
      for (let column = 0; column < this.Columns; column++) {
        const $column = $('<div>')
          .addClass('column empty');
        $row.append($column);
      }
        $board.append($row);
    }
  }
}