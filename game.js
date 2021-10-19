export default class Game {
    constructor(){
        this.Turns = 0;
        this.WhitesTurn = true;
        this.Picked = false;
        this.IsRunning = true;
        this.PickedNumber;
    }
    turn(){
        this.WhitesTurn = !this.WhitesTurn;
        this.Turns++;
        this.Picked = false;

        if (this.WhitesTurn){
            console.log('Its white players turn');
        } else{
            console.log('Its black players turn');
        }
    }


}