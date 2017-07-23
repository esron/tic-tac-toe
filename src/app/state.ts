export class State {
    board: string[][] = [[],[],[]];
    depth: number;
    fn: number;
    parent: State
    played:number[] = [0, 0];

    constructor(board: string[][], depth: number, parent: State, played:number[]) {
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = board[i][j];
            }
        }

        this.played[0] = played[0];
        this.played[1] = played[1];
        this.depth = depth;
        this.parent = parent;
    }

    equals(state: State) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if(this.board[i][j] != state.board[i][j])
                    return false;
        return true;
    }

    copy(state: State) {
        return new State(state.board, state.depth, state.parent, state.played);
    }

    setParent(state: State) {
        this.parent = state;
        return this;
    }

    setPlayed(i:number, j:number) {
        this.played[0] = i;
        this.played[1] = j;
    }

    toString() {
        let string = "board:\n";
        
        for(let i = 0; i < 3; i++)
            string += "["+this.board[i][0]+","+this.board[i][1]+","+this.board[i][2]+"]\n";
        string += "terminal ? " + this.isTerminal() + 
        "\nPlayed (" + this.played[0] + ", " + this.played[1] + ")" +
        "\nhn(n) = " + this.getHn() +
        "\nDepth " + this.depth;

        return string;
    }

    getChilds(player:string) {
        let childs: State[] = [];
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.board[i][j] == ' ') {
                    let child = this.copy(this).setParent(this);
                    child.setPlayed(i, j);
                    child.board[i][j] = player;
                    child.depth++;
                    childs.push(child);
                }
            }
        }

        return childs;
    }

    getHn() {
        for(let i = 0; i < 3; i++) {
          // Checar linhas
          if(this.board[i][0] == this.board[i][1] && this.board[i][0] == this.board[i][2]
            && (this.board[i][0] == 'X' || this.board[i][0] == 'O')) {
            return this.board[i][0] == 'X' ? this.depth - 10:10 - this.depth;
          }

          // Checar colunas
          if(this.board[0][i] == this.board[1][i] && this.board[0][i] == this.board[2][i]
            && (this.board[0][i] == 'X' || this.board[0][i] == 'O')) {
            return this.board[0][i] == 'X' ? this.depth - 10:10 - this.depth;
          }
        }

        // Checar diagonais
        if(((this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2])
          || (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0]))
          && (this.board[1][1] == 'X' || this.board[1][1] == 'O')) {
            return this.board[1][1] == 'X' ? this.depth - 10:10 - this.depth;
        }
        return 0;
    }

    isTerminal() {
        if(this.getHn() == 0)
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if(this.board[i][j] == ' ') {
                        return false;
                    }
                }
            }
        return true; 
    }
}