import Piece from "./piece.js";

export default class Pawn extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Pawn";
        this.Value = 1;
        this.Symbol = isWhite? "\u2659": "\u265F";    
    }
    CheckMove (destination,origin,board){
        return false;
    }
}