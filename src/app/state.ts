export class State {
    board: string[][];
    hn: number;
    gn: number;
    fn: number;
    parent: State

    constructor(board: string[][], depth: number, parent: State) {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                this.board[i][j] = board[i][j];
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

    toString() {
        let string = "board:\n";
        
        for(let i = 0; i < 3; i++)
            string += "["+this.board[i][0]+","+this.board[i][1]+","+this.board[i][2]+"]\n";

        string += "h(n) = " + this.hn;
    }
}