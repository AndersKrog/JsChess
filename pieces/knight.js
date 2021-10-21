import Piece from "./piece.js";

export default class Knight extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Knight";
        this.Value = 3;
        this.Symbol = isWhite? "\u2658": "\u265E";    
    }
    CheckMove (originX,originY,destinationX,destinationY,board){
        //let direction = board[originX][originY].IsWhite? -1: 1;

        // måske smart
        if (Math.abs(originX - destinationX) + Math.abs(originY - destinationY) == 3
        && (board[destinationX][destinationY].Name == 'Empty' || (board[originX][originY].IsWhite != board[destinationX][destinationY].IsWhite))){
            return true;
            // så skal brikken markeres som rykket, men det kan jeg ikke gøre herfra, med den nuværende strukur!! da jeg ikke kan ændre boardet her
            // pt gøres det fra move() i index.js
            // alternativt skal jeg tjekke om bonden står på en bestemt række i forhold til spillerens farve, da det er enste mulighed for dette træk
        } else{
            return false;
        }
    }

}