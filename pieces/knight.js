import Piece from "./piece.js";

export default class Knight extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Knight";
        this.Value = 3;
        this.Symbol = isWhite? "\u2658": "\u265E";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}