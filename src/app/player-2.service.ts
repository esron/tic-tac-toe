import { Injectable } from '@angular/core';

import { State } from './state';

@Injectable()
export class Player2Service {

  constructor() { }

  move:number[];

  play(currentState:State) {
    this.move = [];
    this.minimax(currentState, true);
    return this.move;
  }

  minimax(node: State, maximizingPlayer:boolean) {
    let scores:number [] = new Array(0);
    let moves:number[][] = [];

    if(node.isTerminal()){
      return node.getHn();
    }
    if(maximizingPlayer) {
      let childs:State[] = node.getChilds('O');
      let maxScore:number = -Infinity;
      let maxScoreIndex:number = 0;
      childs.forEach(child => {
        moves.push(child.played);
        scores.push(this.minimax(child, false));
      })

      for (let i = 0; i < scores.length; i++) {
        if(scores[i] > maxScore) {
          maxScore = scores[i];
          maxScoreIndex = i;
        }
      }
      this.move = moves[maxScoreIndex];
      return maxScore;
    } else { // Minimizing
      let childs:State[] = node.getChilds('X');
      let minScore:number = Infinity;
      let minScoreIndex:number = 0;
      childs.forEach(child => {
        moves.push(child.played);
        scores.push(this.minimax(child, true));
      })
      for (let i = 0; i < scores.length; i++) {
        if(scores[i] < minScore) {
          minScore = scores[i];
          minScoreIndex = i;
        }
      }
      this.move = moves[minScoreIndex];
      return minScore;
    }
  }
}
