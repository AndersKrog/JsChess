import Pawn from "./pieces/pawn.js";
import Rook from "./pieces/rook.js";
import Knight from "./pieces/knight.js";
import Bishop from "./pieces/bishop.js";
import Queen from "./pieces/queen.js";
import King from "./pieces/king.js";
import Empty from "./pieces/empty.js";

/*
Har forsøgt at smide det hele ind i klasser, men eventListener lader til at begrænse det.
*/

// globale variabler
let picked = false;
let pickedNumber;

let Board = [   
    new Rook(true), new Knight(true), new Bishop(true), new King(true), new Queen(true), new Bishop(true), new Knight(true), new Rook(true),
    new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true),
    new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true),
    new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true),
    new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true),
    new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true),
    new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false),
    new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)
];

////////////////////////////////////////////////////////////
//EVENTS
////////////////////////////////////////////////////////////
function mouseLeave(cell){
    if (!picked || pickedNumber != cell.id){
        cell.className = cell.title;
    }
}
function mouseEnter(cell){
    //console.log("you hovered " + cell.id)
    if (!picked || pickedNumber != cell.id){
        // her skal den tjekke om brikken der står på feltet er ens egen og om der står en brik
        cell.className = "legal";
    } else{
        //checkmove
    }
}
function onClick(cell){
    console.log("you clicked " + cell.id)
    
    if (!picked){
        picked = true;
        pickedNumber = cell.id;
        cell.className ="selected";
    } else if (picked && (pickedNumber == cell.id)){
        picked = false;
        cell.className = cell.title
    }
}

function drawBoard(){
    var body = document.getElementsByTagName("body")[0]

    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    tbl.style.height = "600px";
    tbl.style.width = "600px";

    for (var y = 0; y < 8;y++){
        var row = document.createElement("tr");
        for (var x = 0; x < 8;x++){
            
            var cell = document.createElement("td");
                        
            cell.innerHTML = Board[y*8+x].Symbol;
 
            cell.id = y*8+x;

            cell.addEventListener("click", function(){onClick(this)});
            cell.addEventListener("mouseenter", function(){mouseEnter(this)} );
            cell.addEventListener("mouseleave", function(){mouseLeave(this)} );

            if ((x+y)%2 == 0){
                cell.className = "grey";
                cell.title = "grey";
            }else{
                cell.className = "white";
                cell.title = "white";
            }

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

function start(){
    drawBoard();
}

function move(destination,origin){
    board[pickedNumber].CheckMove(pickedNumber,origin,board);
}


start();