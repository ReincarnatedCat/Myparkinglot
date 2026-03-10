const newNumbers = document.getElementById("new-numbers");
const tiles = document.getElementById("tiles-container");
let x = 4;
const size = x;


let buttons = []

let num = [" ", " ", " "]


function replaceNumbers() {
    newNumbers.innerText = String(num).replaceAll(",", "  ")
}

let nextNumber = " "

function changeNumbers () {
     nextNumber = num.pop();
     let randomNumber = Math.floor(Math.random() * 10);
     num.unshift(randomNumber)

}

function tileGenerator () {
    tiles.innerHTML = "";

    for (let i = 0; i < size ; i++) {
        let row = document.createElement("div");
        tiles.appendChild(row);
        for (let i = 0; i < size ; i++) {

            let btn = document.createElement("button");

        
            row.appendChild(btn);
            btn.addEventListener("click", onClick);
            buttons.push(btn)

            }
    } ;
}


function getNeighboringtiles (index) {
    let neighboringtiles = [];
    if (![x,2*x,3*x].includes(index)) {
    neighboringtiles.push(buttons[index-1]);
    }
        if (![x-1,2*x-1,3*x-1].includes(index)) {
    neighboringtiles.push(buttons[index+1]);
    }
    neighboringtiles.push(buttons[index-x]);
    neighboringtiles.push(buttons[index+x]);
    console.log(neighboringtiles);
    return neighboringtiles
    
}





function checkNeighboringtiles (index) {
    let neighboringtiles = getNeighboringTiles(index);
    for (let tile of neighboringtiles) {
        if (typeof tile == "undefined"){
            continue
        }
        if(tile.innerText == buttons[index].innerText) {
            buttons[index].innerText = nextNumber + 1;
        }


    }
}


function onClick () {
    console.log(buttons.indexOf(this));
    if (!this.innerText == "") {
        return
    }
        changeNumbers();
        replaceNumbers();
        this.innerText = nextNumber;
        checkNeighboringtiles(buttons.indexOf(this));        
}


replaceNumbers();
tileGenerator();
console.log(buttons);


//1. calculate the neighbor tiles.
//2. store them 
//3. check if they are of the same value as "this".
//4. if so, merge them. replace "this" with the new value, and purge the merged tile(s).
//5. display the orginal value before merging. 