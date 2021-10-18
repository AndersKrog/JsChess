import Piece from "./piece.js";

export default class Empty extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Empty";
        this.Value = 0;
        this.Symbol = " ";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}