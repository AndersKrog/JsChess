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

// måske er det nemmere med et todimensionelt array, ellers skal jeg i hvert fald tjekke at man ikke "ryger udover brættet"

let BoardNys = [   
    [new Rook(true), new Knight(true), new Bishop(true), new King(true), new Queen(true), new Bishop(true), new Knight(true), new Rook(true)],
    [new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true), new Pawn(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true), new Empty(true)],
    [new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false), new Pawn(false)],
    [new Rook(false), new Knight(false), new Bishop(false), new Queen(false), new King(false), new Bishop(false), new Knight(false), new Rook(false)]
];



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
    if (!game.Picked || game.PickedNumber != cell.id){
        cell.className = cell.title;
    }
}
function mouseEnter(cell){
    //console.log("you hovered " + cell.id)
    if (!game.Picked || game.PickedNumber != cell.id){
        // her skal den tjekke om brikken der står på feltet er ens egen og om der står en brik
        cell.className = "legal";
    } else{
        //checkmove
    }
}
function onClick(cell){
    console.log("you clicked " + cell.id)
    
    if (!game.Picked){
        game.Picked = true;
        game.PickedNumber = cell.id;
        cell.className ="selected";
    } else if (game.Picked){
        if (game.PickedNumber != cell.id){
            console.log('her');
            move(game.PickedNumber,cell.id,Board);
            // grafik
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

function move(origin,destination){
    
    if (game.Picked){
        console.log(Board[origin].CheckMove(origin,destination,Board));
        if (Board[origin].CheckMove(origin,destination,Board)){
            console.log('move');
            if (Board[origin].IsWhite != Board[destination].white || Board[destination].Name == 'Empty')

            Board[origin].Moved = true;

            let temp = Board[destination];

            Board[destination] = Board[origin];

            if (Board[destination].Name == 'Empty'){
                Board[origin] = temp;
            } else{
                Board[origin] = new Empty(true);
            }
            
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