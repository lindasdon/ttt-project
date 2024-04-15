class ComputerPlayer {

	static board;
	static boardInitialized;

	static initializeBoard(grid = []) {
		this.board = [];
		for (let i = 0; i < 9; i++) {
			if(grid.length === 3) {
				this.board[i] = grid[Math.floor(i / 3)][i % 3];
			} else {
				this.board[i] = ' ';
			}
		}
		this.boardInitialized = true;
	}

	static winLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

  static getValidMoves(grid) {
    let valMovs = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[r][c] === ' ') {
          valMovs.push({ row : r, col : c});
        }
      }
    }
    return valMovs;
  }

  static randomMove(grid) {
    let valMoves = this.getValidMoves(grid);
    return valMoves[Math.floor(Math.random() * valMoves.length)];
  }

  static getWinningMoves(grid, symbol) {

  }

  static getSmartMove(grid, symbol) {
		this.initializeBoard(grid);
		for(let wl = 0; wl < 8; wl++) {
			let line = this.winLines[wl];
			let syms = [this.board[line[0]], this.board[line[1]], this.board[line[2]]];
			if((syms.reduce((acc,sym) => { if (sym === symbol) { return acc + 1; } return acc; }, 0) === 2) &&
				syms.includes(' ')) {
				let winSquare = line[syms.indexOf(' ')];
				return { row : Math.floor(winSquare / 3), col : winSquare % 3 };
			}
		}
		let marks = 'XO';
		let oppSymbol = marks[1 - marks.indexOf(symbol)];
		for(let wl = 0; wl < 8; wl++) {
			let line = this.winLines[wl];
			let syms = [this.board[line[0]], this.board[line[1]], this.board[line[2]]];
			if((syms.reduce((acc,sym) => { if (sym === oppSymbol) { return acc + 1; } return acc; }, 0) === 2) &&
				syms.includes(' ')) {
				let blockSquare = line[syms.indexOf(' ')];
				return { row : Math.floor(blockSquare / 3), col : blockSquare % 3 };
			}
		}
  }
}

module.exports = ComputerPlayer;
