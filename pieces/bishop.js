import Piece from "./piece.js";

export default class Bishop extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Bishop";
        this.Value = 3;
        this.Symbol = isWhite? "\u2657": "\u265D";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}