import Piece from "./piece.js";

export default class Queen extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Queen";
        this.Value = 9;
        this.Symbol = isWhite? "\u2655": "\u265B";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}