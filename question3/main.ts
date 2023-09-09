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
          return "Column full!";
      }

      this.boardMatrix[col].unshift(this.currPlayer);
      this.boardMatrix[col].pop();


      if (this.checkWin(col)) {
          this.endOfGame = true;
          return `Player ${this.currPlayer} wins!${this.boardMatrix[col]}`;
      }

      const message = `Player ${this.currPlayer} has a turn`;
      this.currPlayer = 3 - this.currPlayer; // Switch to the other player (1 -> 2, 2 -> 1)
      return message;
  }

  private checkWin(col: number): boolean {
      const row = this.boardMatrix[col].length - 1;
      const player = this.boardMatrix[col][row];

      // horizontal check
      if (
          this.checkMatrix(col - 3, col, 0, 1, player) ||
          this.checkMatrix(col - 2, col + 1, 0, 1, player) ||
          this.checkMatrix(col - 1, col + 2, 0, 1, player) ||
          this.checkMatrix(col, col + 3, 0, 1, player)
      ) {
          return true;
      }

      // vertical check
      if (this.checkMatrix(col, col, row - 3, row, player)) {
          return true;
      }

      // from bottom-left to top-right
      if (
          this.checkMatrix(col - 3, col, row - 3, row, player) ||
          this.checkMatrix(col - 2, col + 1, row - 2, row + 1, player) ||
          this.checkMatrix(col - 1, col + 2, row - 1, row + 2, player) ||
          this.checkMatrix(col, col + 3, row, row + 3, player)
      ) {
          return true;
      }

      // from bottom-right to top-left
      if (
          this.checkMatrix(col + 3, col, row - 3, row, player) ||
          this.checkMatrix(col + 2, col - 1, row - 2, row + 1, player) ||
          this.checkMatrix(col + 1, col - 2, row - 1, row + 2, player) ||
          this.checkMatrix(col, col - 3, row, row + 3, player)
      ) {
          return true;
      }

      return false;
  }

  private checkMatrix(
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