import Piece from "./piece.js";

export default class Pawn extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Pawn";
        this.Value = 1;
        this.Symbol = isWhite? "\u2659": "\u265F";    
    }
    CheckMove (originX, originY,destinationX,destinationY,board){
        let direction = board[originX][originY].IsWhite? -1: 1;
        
        //console.log(originY - destinationY);
        //console.log(originY - destinationY == 2*direction);

        if (originX == destinationX){
            if (originY - destinationY == 2*direction && board[destinationX][destinationY].Name == 'Empty'){
                if (!board[originX][originY].Moved){
                    return true;
                // så skal brikken markeres som rykket, men det kan jeg ikke gøre herfra, med den nuværende strukur!! da jeg ikke kan ændre boardet her
                // pt gøres det fra move() i index.js
                // alternativt skal jeg tjekke om bonden står på en bestemt række i forhold til spillerens farve, da det er enste mulighed for dette træk
                }
            } // ellers ryk normalt
            else if ((originY - destinationY == direction) && board[destinationX][destinationY].Name == 'Empty'){   
                return true;
            } else{
                return false;
            }
            // slå brik
        }else if (Math.abs(originX - destinationX) == 1 && originY - destinationY == direction
        && board[destinationX][destinationY].Name != 'Empty' && board[originX][originY].IsWhite != board[destinationX][destinationY].IsWhite){
            return true;
        }else{
            return false;
        }
    }
}