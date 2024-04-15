const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up = () => {
    if (this.row > 0) {
			this.resetBackgroundColor();
    	this.row--;
			this.setBackgroundColor();
			Screen.render();
    }
  }

  down = () => {
    if (this.row < 2) {
			this.resetBackgroundColor();
    	this.row++;
			this.setBackgroundColor();
    	Screen.render();
    }
  }

  left = () => {
    if (this.col > 0) {
			this.resetBackgroundColor();
    	this.col--;
			this.setBackgroundColor();
			Screen.render();
    }
  }

  right = () => {
    if (this.col < 2) {
			this.resetBackgroundColor();
    	this.col++;
			this.setBackgroundColor();
    	Screen.render();
    }
  }

}


module.exports = Cursor;
