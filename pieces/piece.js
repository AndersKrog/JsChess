export default class Piece{
    constructor(isWhite){
        this.Name;
        this.IsWhite = isWhite;
        this.Inplay = true;
        this.Moved = false;
        this.Value;
        this.Symbol = " ";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}