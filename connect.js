$(document).ready(function () {
    function  gameSetUp(){
		for (var i = 0; i < 42; i++) {
			var makeSquares = $('#board');
			makeSquares.append($('<div/>', {
              id: 'littleSquares' + i,
              class: 'square'
            }));
			 
        }
	};
	gameSetUp();
	

	//  For start button, instead of line 12
	// create a start button in html, and have it call gameSetUp() when clicked

	// 



	var currentPlayer = 1;

	$('#board').on('click', function (event){
		$(event.target).addClass(`player${currentPlayer}`);
			if (currentPlayer === 1){ // write an and(&&) statement that checks to see if the space already has a class of player 2 
				currentPlayer = 2;
				// alert() event.target.id
			} else if (currentPlayer === 2){ // write an and(&&) statement that checks to see if the space already has a class of player 1
				currentPlayer = 1;
				// alert() event.target.id
			}
	});

	var x = x;
	var y = y;

function dropPiece(x, player){
 		for (var i = 5; i >= 0; i--){
 			if (!board[i][x]) {
	 			board[i][x] = player;
	 			return;
 			}
 		}
 	}


 	
 	var board = [
		[0,0,0,0,0,0,0],
	    [0,0,0,0,0,0,0],
 	 	[0,0,0,0,0,0,0],
 	    [0,0,0,0,0,0,0],
 	    [0,0,0,0,0,0,0],
 	    [0,0,0,0,0,0,0]
 	];

 console.table(board);

		
}); 
