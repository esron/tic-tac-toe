import { Injectable } from '@angular/core';

import { State } from './state';

@Injectable()
export class Player2Service {

  constructor() { }

  play(board:string[][]) {
    // let currentState: State = new State(board, 0, null);
    let currentState: State = new State([board[0], board[1], board[2]], 0, null, [0, 0]);
    console.log("Estado inicial\n" + currentState.toString());

    currentState.getChilds().forEach(child => {
      console.log(child.toString());
    });

    return [1, 1];
  }

  isTerminalNode(board) {
    for(let i = 0; i < 3; i++) {
      // Checar linhas
      if(board[i][0] == board[i][1] && board[i][0] == board[i][2]
        && (board[i][0] == 'X' || board[i][0] == 'O')) {
        return true;
      }

      // Checar colunas
      if(board[0][i] == board[1][i] && board[0][i] == board[2][i]
        && (board[0][i] == 'X' || board[0][i] == 'O')) {
        return true;
      }
    }

    // Checar diagonais
    if(((board[0][0] == board[1][1] && board[0][0] == board[2][2])
      || (board[0][2] == board[1][1] && board[0][2] == board[2][0]))
      && (board[1][1] == 'X' || board[1][1] == 'O')) {
        return true;
    }

    // Checar empate
    for(let i = 0; i < 3; i++)
      for(let j = 0; j < 3; j++){
        if(board[i][j] == ' ')
          return false;
      }
    return true;
  }
}
