import { Injectable } from '@angular/core';

import { State } from './state';

@Injectable()
export class Player2Service {

  constructor() { }

  play(board:string[][]) {
    let currentState: State = new State(board, 0, null, [0, 0]);

    let bestNode:State = this.minimax(currentState, currentState.gn, true);

    return bestNode.played;
  }

  minimax(node: State, depth:number, maximizingPlayer:boolean) {

    //alert("Testing\n" + node.toString());
    //console.log("Testing\n" + node.toString());
    if(node.isTerminal() || node.gn == 8)
      return node;
    if(maximizingPlayer) {
      let bestNode:State = node.getChilds('O')[0];
      node.getChilds('O').forEach(child => {
        bestNode = this.minimax(child, depth + 1, false).getHn() > bestNode.getHn() ? child : bestNode;
      })
      //alert("Best node MAX\n" + bestNode.toString());
      console.log("Best MAX\n" + node.toString());
      return bestNode;
    } else { // Minimizing
      let bestNode:State = node.getChilds('X')[0];
      node.getChilds('X').forEach(child => {
        bestNode = this.minimax(child, depth + 1, true).getHn() < bestNode.getHn() ? child : bestNode;
      })
      //alert("Best node MIN\n" + bestNode.toString());
      console.log("Best MIN\n" + node.toString());
      return bestNode;
    }
  }
}
