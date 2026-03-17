const options = document.getElementById("options");
const tileContainer = document.getElementById("tiles-container");
const scoreCounter = document.getElementById("score-counter")
let x = 5;
const size = x;


let tiles = [];
let maxNum = 5;
scoreCounter.innerText = 0;

let num = [Math.floor(Math.random() * maxNum), Math.floor(Math.random() * maxNum), Math.floor(Math.random() * maxNum)];






function replaceOptions() {
    options.innerText = String(num).replaceAll(",", "  ")
};

let nextOption = " ";

function updateOptions () {
     nextOption = num.pop();
     let randomOption = Math.floor(Math.random() * maxNum);
     num.unshift(randomOption)

}

function tileGenerator () {
    tiles.innerHTML = "";

    for (let i = 0; i < size ; i++) {
        let row = document.createElement("div");
        tileContainer.appendChild(row);
        for (let i = 0; i < size ; i++) {

            let btn = document.createElement("button");

        
            row.appendChild(btn);
            btn.addEventListener("click", onClick);
            tiles.push(btn)

            }
    } ;
}


function getNeighboringtiles (index) {
    let neighboringtiles = [];
    let leftcolumn = [];
    let rightcolumn = [];
    for (let i=1; i < x; i++) {
       leftcolumn.push(x*i);
       rightcolumn.push(x*i-1);
    };
    if (!leftcolumn.includes(index)) {
    neighboringtiles.push(tiles[index-1]);
    }
        if (!rightcolumn.includes(index)) {
    neighboringtiles.push(tiles[index+1]);
    }
    neighboringtiles.push(tiles[index-x]);
    neighboringtiles.push(tiles[index+x]);
    console.log(leftcolumn);
    console.log(rightcolumn);
    console.log(neighboringtiles);
    return neighboringtiles
    
}





function checkNeighboringtiles(index) {
    let mergableTiles = [];
    for (let tile of getNeighboringtiles(index)) {
        if (typeof tile == "undefined"){
            continue
        }
        if(tile.innerText == 10){
            continue
        }
        if(tile.innerText == tiles[index].innerText) {
            mergableTiles.push(tile);   
        }
 
    }
    if(mergableTiles.length !== 0) {
        mergeTiles(mergableTiles, index);
        checkNeighboringtiles(index);
    }
}


function mergeTiles(mergableTiles, index) {
            tiles[index].innerText = parseInt(tiles[index].innerText) + 1;
            for (let mergableTile of mergableTiles){
                mergableTile.innerText = "";
                addScore(parseInt(tiles[index].innerText));
            }

}

function addScore(value) {
    scoreCounter.innerText = parseInt(scoreCounter.innerText) + value*2;

}





function gameReset() {
    for(let tile of tiles) {
        tile.innerText = "";
    }
}

function checkGameover() {
    for (let tile of tiles) {
        if (tile.innerText == "") {
          return  
        }
        
    }

    gameReset();
}




function onClick () {
    console.log(tiles.indexOf(this));
    if (!this.innerText == "") {
        return
    }
        updateOptions();
        replaceOptions();
        this.innerText = nextOption;
        checkNeighboringtiles(tiles.indexOf(this));  
        checkGameover();      
}


replaceOptions();
tileGenerator();
console.log(tiles);


//!1. calculate the neighbor tiles.
//!2. store them 
//!3. check if they are of the same value as "this".
//!4. if so, merge them. replace "this" with the new value, and purge the merged tile(s).
//!5. display the orginal value before merging. 
//!5. clean up code
//!6. set caps for the numbers. 
//7. gameover screen
//8. create record tracking function, display current score and all time high score.
//9. reset game
//!10. figure out how to check if there are neighboring tiles that can be merged, since the merge only happened once.
//!11. If there are multiple neighboring tiles that hold the same value, all of them need to be merged. 