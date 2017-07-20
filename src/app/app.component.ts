import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // player X sempre começa
  player:string = "X";
  xScore:number = 0;
  oScore:number = 0;
  showWinMessage:boolean = false;
  winMessage:string = "";
  buttonsActive:string = "";
  board: string[][] = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

  color = "btn btn-lg btn-info"

  play(lin: number, col:number) {
    if(this.board[lin][col] == ' '){
      this.board[lin][col] = this.player;
      if(this.player == 'X')
        this.player = "O";
      else
        this.player = 'X';
    }
    if(this.checkWin())
      this.buttonsActive = "disabled";
  }

  resetBoard() {
    this.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    this.player = "X";
    this.winMessage = "";
    this.buttonsActive = "";
  }

  resetScore() {
    this.xScore = 0;
    this.oScore = 0;
  }

  resetGame() {
    this.resetBoard();
    this.resetScore();
  }

  // Chega se ha alguma vitória, retorna verdadeiro em caso de vitória.
  checkWin() {
    for(let i = 0; i < 3; i++) {
      // Checar linhas
      if(this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]
        && (this.board[i][0] == 'X' || this.board[i][0] == 'O')) {
        this.winMessage = "Vitoria do Jogador " + this.board[i][0];
        this.xScore = this.board[i][0] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.board[i][0] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }

      // Checar colunas
      if(this.board[0][i] == this.board[1][i] && this.board[2][i] == this.board[i][2]
        && (this.board[0][i] == 'X' || this.board[0][i] == 'O')) {
        this.winMessage = "Vitoria do Jogador " + this.board[0][i];
        this.xScore = this.board[0][i] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.board[0][i] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }
    }
  }

  cellColor(symbol: string) {
    switch(symbol) {
      case 'X':
        return "btn btn-lg btn-info";
      case 'O':
        return "btn btn-lg btn-warning";
      case ' ':
        return "btn btn-lg";
    }
  }
}
