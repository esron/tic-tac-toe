export class State {
    board: string[][] = [[],[],[]];
    hn: number;
    gn: number;
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
        this.gn = depth;
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
        return new State(state.board, state.gn, state.parent, state.played);
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
        string += "h(n) = " + this.hn;

        return string;
    }

    getChilds() {
        let childs: State[] = [];
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.board[i][j] == ' ') {
                    let child = this.copy(this).setParent(this);
                    child.board[i][j] = 'O';
                    child.setPlayed(i, j);
                    childs.push(child);
                }
            }
        }

        return childs;
    }
}