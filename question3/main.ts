export class Connect4 {
    private boardMatrix: number[][];
    private currPlayer: number; 
    private endOfGame: boolean;

    constructor() {

      this.boardMatrix = Array.from({ length: 6 }, () => Array(7).fill(null));

      this.currPlayer = 1;

      this.endOfGame= false;
    }
  
    play(col: number): string {
      
      if (this.endOfGame) {
          return "Game has finished!";
      }

      if (this.boardMatrix[col].length > 8) {
          return `${this.boardMatrix[col]}`;
      }

      this.boardMatrix[col].unshift(this.currPlayer);
      this.boardMatrix[col].pop();


      if (this.checkForWin(col)) {
          this.endOfGame = true;
          return `Player ${this.currPlayer} wins!${this.boardMatrix[col]}`;
      }

      const message = `Player ${this.currPlayer} has a turn`;
      this.currPlayer = 3 - this.currPlayer; // Switch to the other player (1 -> 2, 2 -> 1)
      return message;
  }

  private checkForWin(col: number): boolean {
      const row = this.boardMatrix[col].length - 1;
      const player = this.boardMatrix[col][row];

      // Check horizontally
      if (
          this.checkLine(col - 3, col, 0, 1, player) ||
          this.checkLine(col - 2, col + 1, 0, 1, player) ||
          this.checkLine(col - 1, col + 2, 0, 1, player) ||
          this.checkLine(col, col + 3, 0, 1, player)
      ) {
          return true;
      }

      // Check vertically
      if (this.checkLine(col, col, row - 3, row, player)) {
          return true;
      }

      // Check diagonally (from bottom-left to top-right)
      if (
          this.checkLine(col - 3, col, row - 3, row, player) ||
          this.checkLine(col - 2, col + 1, row - 2, row + 1, player) ||
          this.checkLine(col - 1, col + 2, row - 1, row + 2, player) ||
          this.checkLine(col, col + 3, row, row + 3, player)
      ) {
          return true;
      }

      // Check diagonally (from bottom-right to top-left)
      if (
          this.checkLine(col + 3, col, row - 3, row, player) ||
          this.checkLine(col + 2, col - 1, row - 2, row + 1, player) ||
          this.checkLine(col + 1, col - 2, row - 1, row + 2, player) ||
          this.checkLine(col, col - 3, row, row + 3, player)
      ) {
          return true;
      }

      return false;
  }

  private checkLine(
      startCol: number,
      endCol: number,
      startRow: number,
      endRow: number,
      player: number
  ): boolean {
      for (let col = startCol, row = startRow; col <= endCol && row <= endRow; col++, row++) {
          if (this.boardMatrix[col][row] === player) {
              if (col === endCol && row === endRow) {
                  return true;
              }
          } else {
              break;
          }
      }
      return false;
  }
  }