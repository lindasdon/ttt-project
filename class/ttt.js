const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

		this.cursor.setBackgroundColor();
		Screen.render();

    // Replace this with real commands
    Screen.addCommand('e', 'move cursor up', this.cursor.up);
    Screen.addCommand('x', 'move cursor down', this.cursor.down);
    Screen.addCommand('s', 'move cursor left', this.cursor.left);
    Screen.addCommand('d', 'move cursor right', this.cursor.right);
    Screen.addCommand('m', 'make move at cursor', () => { this.move(); });

    Screen.render();
  }

  static checkWin(grid) {
		let winner = grid.reduce((mark, row) => { if (('OX'.includes(row[0])) &&
			(row[1] === row[0]) && (row[2] === row[0])) { return row[0]; } return mark; }, ' ');
		if ('OX'.includes(winner)) {
			return winner;
		} else {
			for (let col = 0; col < 3; col++) {
				if (grid.filter(row => row[col] === grid[0][col]).length === 3) {
					winner = grid[0][col];
					if ('OX'.includes(winner)) {
						return winner;
					}
				}
			}
			if(('OX'.includes(grid[1][1])) && (((grid[0][0] === grid[1][1]) &&
				(grid[2][2] === grid[1][1])) || ((grid[0][2] === grid[1][1]) &&
				(grid[2][0] === grid[1][1])))) {
				return grid[1][1];
			}
			for (let row = 0; row < 3; row++) {
				if((grid[row][0] === ' ') || (grid[row][1] === ' ') || (grid[row][2] === ' ')) {
					return false;
				}
			}
			return 'T';
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
		}
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  switchPlayer() {
  	if (this.playerTurn === 'O') {
  		this.playerTurn = 'X';
		} else { this.playerTurn = 'O'; }
	}
	
	move = () => {
		if (Screen.grid[this.cursor.row][this.cursor.col] === ' ') {
			Screen.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
			let winner = TTT.checkWin(Screen.grid);
			if(winner) {
				TTT.endGame(winner);
			}
			this.switchPlayer();
		}
	}

}

module.exports = TTT;
