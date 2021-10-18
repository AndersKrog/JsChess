import Piece from "./piece.js";

export default class Rook extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Rook";
        this.Value = 5;
        this.Symbol = isWhite? "\u2656": "\u265C";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}