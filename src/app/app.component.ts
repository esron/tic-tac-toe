import { Component } from '@angular/core';

import { Player2Service } from './player-2.service';
import { State } from './state';

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
  mainState: State;

  constructor (private player2: Player2Service) {
    this.mainState = new State([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']], 0, [0, 0]);
  }

  play(lin: number, col:number) {
    if(this.mainState.board[lin][col] == ' '){
      this.mainState.board[lin][col] = this.player;
      if(this.checkWin()){
        this.buttonsActive = "disabled";
        return;
      }
      if (this.selectedGameMode == "2 jogadores") {
        if(this.player == 'X')
          this.player = 'O';
        else
          this.player = 'X';
        this.mainState.setPlayed(lin, col);
      }
      else {
        if(this.player == 'X') {
          this.player = 'O';
          this.mainState.setPlayed(lin, col);
          let arr = this.player2.play(this.mainState);
          this.mainState.board[arr[0]][arr[1]] = this.player;
          if(this.checkWin()){
            this.buttonsActive = "disabled";
            return;
          }
          this.player = 'X';
        }
      }
    }
  }

  resetBoard() {
    this.mainState.board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
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

  // Chega se ha alguma vitória, retorna verdadeiro em caso de vitória ou empate.
  // Atualiza os elementos da interface
  checkWin() {
    for(let i = 0; i < 3; i++) {
      // Checar linhas
      if(this.mainState.board[i][0] == this.mainState.board[i][1] && this.mainState.board[i][0] == this.mainState.board[i][2]
        && (this.mainState.board[i][0] == 'X' || this.mainState.board[i][0] == 'O')) {
        this.winMessage = "Vitória do Jogador " + this.mainState.board[i][0];
        this.xScore = this.mainState.board[i][0] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.mainState.board[i][0] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }

      // Checar colunas
      if(this.mainState.board[0][i] == this.mainState.board[1][i] && this.mainState.board[0][i] == this.mainState.board[2][i]
        && (this.mainState.board[0][i] == 'X' || this.mainState.board[0][i] == 'O')) {
        this.winMessage = "Vitória do Jogador " + this.mainState.board[0][i];
        this.xScore = this.mainState.board[0][i] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.mainState.board[0][i] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
      }
    }

    // Checar diagonais
    if(((this.mainState.board[0][0] == this.mainState.board[1][1] && this.mainState.board[0][0] == this.mainState.board[2][2])
      || (this.mainState.board[0][2] == this.mainState.board[1][1] && this.mainState.board[0][2] == this.mainState.board[2][0]))
      && (this.mainState.board[1][1] == 'X' || this.mainState.board[1][1] == 'O')) {
        this.winMessage = "Vitória do Jogador " + this.mainState.board[1][1];
        this.xScore = this.mainState.board[1][1] == 'X' ? this.xScore + 1 : this.xScore;
        this.oScore = this.mainState.board[1][1] == 'O' ? this.oScore + 1 : this.oScore;
        return true;
    }

    // Checar empate
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++){
        if(this.mainState.board[i][j] == ' ')
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
