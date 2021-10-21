import Piece from "./piece.js";

export default class King extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "King";
        this.Value = 200;
        this.Symbol = isWhite? "\u2654": "\u265A";    
    }
    CheckMove (originX, originY,destinationX,destinationY,board){
    if ((Math.abs(originX - destinationX) < 2 && Math.abs(originY - destinationY) < 2 )
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