class TicTacToe {
    constructor() {
        this.button = document.querySelector("#playerButton");
        this.box = document.querySelector("#container");
        this.boxes = document.querySelectorAll("div.box");
        this.counter = 1;
        this.arr = [];
        this.DIM = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
            [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
          ];
        this.clickPlayerButton();
    }

clickPlayerButton() {
    this.button.addEventListener("click", (event) => this.choosePlayers(event))
}

choosePlayers() {
    const player1 = prompt("What is your name, player 1?");
    const player2 = prompt("What is your name, player 2?")
    this.initializeGame(player1,player2);
}

initializeGame(player1,player2) {
    this.box.addEventListener("click", (event) => this.boxClicked(event,player1,player2));
}


// box.addEventListener("click", boxClicked);
  
boxClicked(event,player1,player2){   
    //first check if the target has an object
    if (event.target.firstChild) {
        //do nothing
    } else {
        //add the X or O object to the target if it is unoccupied
        const target = Number(event.target.id);//get the id of the selected box
        let player = "";

        const { gameObject, gameImage } = this.gameObject();//deduce what kind of image we'll be using from the object
        const image = document.createElement("img");//create image
        if (gameImage === "x") {
            image.src = "./images/X.png";
            player = player1;
        } else if (gameImage === "o") {
            image.src = "./images/O.png";
            player = player2;
        }
        event.target.appendChild(image);//add image to the div

        //push new object to the game array and update counter
        this.arr.push({ gameObject, gameImage, target, player });
        console.log(this.arr);
        this.counter++;
        
        //check for a win
        if (this.arr.length > 4){
            this.findWinner();
        }

        //check for a tie
        if (this.arr.length >= 9) {
            this.tie();
        }
    }
}

//factory function for X or O object
 gameObject() {
    const gameObject = this.counter % 2 === 1 ? "X" : "O";
    const gameImage = gameObject.toLowerCase();
    return {gameObject,gameImage};
}

//method for win
findWinner() {
    const filteredXArray = this.arr.filter((value) => value.gameObject === "X");
    console.log(filteredXArray);
    const filteredOArray = this.arr.filter((value) => value.gameObject === "O");

    const XNumbersArray = [];
    filteredXArray.forEach((arr) => XNumbersArray.push(arr.target));
    const ONumbersArray = [];
    filteredOArray.forEach((arr) => ONumbersArray.push(arr.target));

    const XMatches = this.hasMatchingArray(XNumbersArray, this.DIM);
    const OMatches = this.hasMatchingArray(ONumbersArray, this.DIM);

    if (XMatches === true) {
        console.log(`This is a win for ${filteredXArray[0].player}`);
        this.resetCode();
    } else if (OMatches === true) {
        console.log(`This is a win for ${filteredOArray[0].player}`)
        this.resetCode();
    } else {
        //Do nothing
    }
}

hasMatchingArray(arrToCheck, arrays) {
    return arrays.some((arr) => arr.every((num) => arrToCheck.includes(num)));
  }

//method for a tie
//clear board, redefine counter, clean array
tie() {
    console.log("This is a tie");
    this.resetCode();
}



resetCode() {
    this.counter = 1;
    this.boxes.forEach((bx) => {
        if (bx.firstChild) { 
            bx.removeChild(bx.firstChild)
        }else {
            //do nothing
         }
    })
    this.arr.length = 0;    
}
}

// Instantiate the TicTacToe object when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const ticTacToe = new TicTacToe();
  });