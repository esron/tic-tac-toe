import { Component } from '@angular/core';

import { Player2Service } from './player-2.service';

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

  // Escolhe entre os modos de dois jogadores e 1 jogador
  selectedGameMode:string = "2 jogadores";
  board: string[][] = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

  constructor (private player2: Player2Service) {

  }

  play(lin: number, col:number) {
    if(this.board[lin][col] == ' '){
      this.board[lin][col] = this.player;
      if (this.selectedGameMode == "2 jogadores") {
        if(this.player == 'X')
          this.player = 'O';
        else
          this.player = 'X';
      }
      else {
        if(this.player == 'X') {
          this.player = 'O';
          let arr = this.player2.play(this.board);
          this.board[arr[0]][arr[1]] = this.player;
          this.player = 'X';
        }
      }
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
        this.winMessage = "Vitória do Jogador " + this.board[i][0];
        this.xScore = this.board[i][0] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.board[i][0] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }

      // Checar colunas
      if(this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]
        && (this.board[0][i] == 'X' || this.board[0][i] == 'O')) {
        this.winMessage = "Vitória do Jogador " + this.board[0][i];
        this.xScore = this.board[0][i] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.board[0][i] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }
    }

    // Checar diagonais
    if(((this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2])
      || (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]))
      && (this.board[1][1] == 'X' || this.board[1][1] == 'O')) {
        this.winMessage = "Vitória do Jogador " + this.board[1][1];
        this.xScore = this.board[1][1] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.board[1][1] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
    }

    // Checar empate
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++){
        if(this.board[i][j] == ' ')
          return false;
      }

    this.winMessage = "Empate";
    return true;
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
