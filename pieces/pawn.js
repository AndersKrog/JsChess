import Piece from "./piece.js";

export default class Pawn extends Piece{
    constructor(isWhite){
        super(isWhite)
        this.Name = "Pawn";
        this.Value = 1;
        this.Symbol = isWhite? "\u2659": "\u265F";    
    }
    CheckMove (origin,destination,board){
        let direction = board[origin].IsWhite? -1: 1;
        
        console.log(origin - destination );
        console.log(direction);

        // hvis det er første træk
        if (origin - destination == 16*direction && board[destination].Name == 'Empty'){
            if (!board[origin].Moved){
                return true;
            // TODO så skal brikken markeres som rykket, men det kan jeg ikke gøre herfra, med den nuværende strukur!! da jeg ikke kan ændre boardet her
            // alternativt skal jeg tjekke om bonden står på en bestemt række i forhold til spillerens farve, da det er enste mulighed for dette træk
            }
        } // ellers ryk normalt
        else if ((origin - destination == 8*direction) && board[destination].Name == 'Empty'){   
            return true;
        } else{
            return false;
        }
        
    }
}