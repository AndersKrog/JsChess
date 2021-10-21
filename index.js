import Pawn from "./pieces/pawn.js";
import Rook from "./pieces/rook.js";
import Knight from "./pieces/knight.js";
import Bishop from "./pieces/bishop.js";
import Queen from "./pieces/queen.js";
import King from "./pieces/king.js";
import Empty from "./pieces/empty.js";

import Player from "./player.js";
import Game from "./game.js";

/*
generelle noter:
Har forsøgt at smide det hele ind i klasser, men eventListener lader til at begrænse det.
*/

// globale variabler
let game = new Game;

let player1 = new Player(true);
let player2 = new Player(false);

/*
let Board = [   
    [new Rook(true), new Knight(true), new Bishop(true), new King(true), new Queen(true), new Bishop(true), new Knight(true), new Rook(true)],
    [new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false)],
    [new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)]
];
*/

let Board = [   
    [new Rook(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new Rook(false)],
    [new Knight(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false),new Knight(false)],
    [new Bishop(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false),new Bishop(false)],
    [new King(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new Queen(false)],
    [new Queen(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new King(false)],
    [new Bishop(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new Bishop(false)],
    [new Knight(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new Knight(false)],
    [new Rook(true), new Pawn(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Pawn(false), new Rook(false)]
];


////////////////////////////////////////////////////////////
//EVENTS
////////////////////////////////////////////////////////////
function mouseLeave(cell){
    if (!game.Picked || game.PickedNumber != cell.id){
        cell.className = cell.title;
    }
}
function mouseEnter(cell){
    //console.log("you hovered " + cell.id)
    let destinationX = cell.id%8;
    let destinationY = Math.floor(cell.id/8);            

    let originX = game.PickedNumber%8;
    let originY = Math.floor(game.PickedNumber/8);            

    if (!game.Picked){
        if(game.WhitesTurn == Board[destinationX][destinationY].IsWhite || Board[destinationX][destinationY].Name == "Empty"){
            cell.className = "legal";
        }else{
            cell.className = "illegal";             
            }
        }else{
            if (game.WhitesTurn != Board[destinationX][destinationY].IsWhite || Board[destinationX][destinationY].Name == "Empty"){
                // tjek om træk er lovligt, hvis ja: legal
                if (Board[originX][originY].CheckMove(originX,originY,destinationX,destinationY,Board)){
                    cell.className = "legal";
                }else{
                    cell.className = "illegal";             
                    }   
            }else{
                cell.className = "illegal";             
                }   
        }
}

function onClick(cell){
    console.log("you clicked " + cell.id)

    let destinationX = cell.id%8;
    let destinationY = Math.floor(cell.id/8);            


    if (!game.Picked && (game.WhitesTurn == Board[destinationX][destinationY].IsWhite) && Board[destinationX][destinationY].Name !== "Empty"){
        game.Picked = true;
        game.PickedNumber = cell.id;
        cell.className ="selected";
    } else if (game.Picked){
        if (game.PickedNumber != cell.id){

            let originX = game.PickedNumber%8;
            let originY = Math.floor(game.PickedNumber/8);            

            move(originX,originY,destinationX,destinationY,Board);
        } else{
            cell.className = cell.title
            game.Picked = false;
        }
    }
}

function drawBoard(){
    
    // ved ikke om denne metode er god til at slette indholdet:
    // der sker et ryk første gang en brik fjernes. det har måske noget med størrelserne på cellerne at gøre 
    document.getElementsByTagName('BODY')[0].innerHTML = '';

    let body = document.getElementsByTagName("body")[0]
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    tbl.style.height = "600px";
    tbl.style.width = "600px";

    for (let y = 0; y < 8;y++){
        let row = document.createElement("tr");
        for (let x = 0; x < 8;x++){
            
            let cell = document.createElement("td");
            
            console.log(`${y} ${x} ${Board[x][y].Symbol}`)
            cell.innerHTML = Board[x][y].Symbol;
 
            //byttet om i forhold til før pga. array
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

function move(originX,originY,destinationX,destinationY){
    console.log(`${originX} ${originY} ${destinationX} ${destinationY}`);
    if (game.Picked){
        console.log("her"); 
        if (Board[originX][originY].CheckMove(originX,originY,destinationX,destinationY,Board)){
            console.log('move');
            if (Board[originX][originY].IsWhite != Board[destinationX][destinationY].IsWhite || Board[destinationX][destinationY].Name == 'Empty')

            // brikken er nu markeret som flyttet
            Board[originX][originY].Moved = true;

            let temp = Board[destinationX][destinationY];


            if (Board[destinationY][destinationX].Name == 'Empty'){
                //flyt brikken.
                Board[destinationX][destinationY] = Board[originX][originY];
                //Board[originX][originY] = temp;
                Board[originX][originY] = new Empty(true);
            } else{
                // slå en brik
                Board[destinationX][destinationY] = Board[originX][originY];
                Board[originX][originY] = new Empty(true);
            }
            // der mangler specieltilfældet med castling, hvor konge og tårn bytter plads

            // måske skal der også gives point

            drawBoard();
            game.turn();

            // TODO : promotion
        }
    }

    // hvis denne lykkedes skal der skiftes tur
}


start();



/*
let tbl = document.getElementsByTagName("body");

tbl.remove();

if(tbl != null){
tbl.remove();
}
*/