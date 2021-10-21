import Piece from "./piece.js";

export default class Rook extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Rook";
        this.Value = 5;
        this.Symbol = isWhite? "\u2656": "\u265C";    
    }
    CheckMove (originX, originY,destinationX,destinationY,board){
    if ((originX == destinationX || originY == destinationY)
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