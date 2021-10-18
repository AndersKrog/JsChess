import Piece from "./piece.js";

export default class King extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "King";
        this.Value = 200;
        this.Symbol = isWhite? "\u2654": "\u265A";    
    }
    CheckMove (destinationX,destinationY,originX,originY){
        return false;
    }
}