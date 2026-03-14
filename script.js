let level = 0

let puzzles = [
"./images/puzzle1.jpg",
"./images/puzzle2.jpg",
"./images/puzzle3.jpg"
]

let messages = [
"Nice start Amma 😉",
"Keep going!",
"Almost done!"
]

let tiles = []
let empty = 8

let interval
let time = 0
let candles = 3



/* PAGE SWITCHING */

function showPage(id){

document.querySelectorAll(".screen").forEach(s=>{
s.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

}



/* GIFT CLICK */

function openGift(){

confetti({
particleCount:120,
spread:100
})

showPage("intro-screen")

}



/* START GAME */

function startGame(){

showPage("game")

level = 0

loadPuzzle()

}



/* LOAD PUZZLE */

function loadPuzzle(){

document.getElementById("level-title").innerText = "Puzzle " + (level+1)

document.getElementById("puzzle-message").innerText = messages[level]

document.getElementById("nextBtn").style.display = "none"

tiles = [0,1,2,3,4,5,6,7,8]

empty = 8

shuffle()

render()

startTimer()

}



/* TIMER */

function startTimer(){

time = 0

clearInterval(interval)

interval = setInterval(()=>{

time++

document.getElementById("timer").innerText = time

},1000)

}



/* SHUFFLE */

function shuffle(){

for(let i=0;i<100;i++){

let r = Math.floor(Math.random()*9)

if(validMove(r)) move(r)

}

}



/* RENDER PUZZLE */

function render(){

let container = document.getElementById("puzzle-container")

container.innerHTML = ""

for(let i=0;i<9;i++){

let tile = document.createElement("div")

tile.className = "tile"

if(tiles[i]===8){

tile.classList.add("empty")

}
else{

let x = (tiles[i]%3)*-100
let y = Math.floor(tiles[i]/3)*-100

tile.style.backgroundImage = "url("+puzzles[level]+")"

tile.style.backgroundPosition = x+"px "+y+"px"

}

tile.onclick = ()=>clickTile(i)

container.appendChild(tile)

}

}



/* TILE CLICK */

function clickTile(i){

if(validMove(i)){

move(i)

render()

checkWin()

}

}



/* VALID MOVE */

function validMove(i){

let row = Math.floor(i/3)
let col = i%3

let erow = Math.floor(empty/3)
let ecol = empty%3

return Math.abs(row-erow)+Math.abs(col-ecol) == 1

}



/* MOVE TILE */

function move(i){

[tiles[i],tiles[empty]] = [tiles[empty],tiles[i]]

empty = i

}



/* SHUFFLE AGAIN BUTTON */

function shuffleAgain(){

clearInterval(interval)

time = 0

document.getElementById("timer").innerText = time

tiles = [0,1,2,3,4,5,6,7,8]

empty = 8

shuffle()

render()

startTimer()

}



/* CHECK WIN */

function checkWin(){

for(let i=0;i<9;i++){
if(tiles[i] != i) return
}

clearInterval(interval)

let finalTime = time

showReveal(finalTime)

}



/* REVEAL SCREEN */

function showReveal(finalTime){

showPage("reveal-screen")

document.getElementById("reveal-title").innerText = "🎉 Well Done!"

document.getElementById("reveal-time").innerText =
"⏱ Time taken: " + finalTime + " seconds"

document.getElementById("reveal-message").innerText =
"You completed Puzzle " + (level+1)

let img = document.getElementById("reveal-image")

img.classList.remove("reveal-img")
void img.offsetWidth
img.classList.add("reveal-img")

img.src = puzzles[level]

confetti({
particleCount:150,
spread:100
})

startFlowers()

}



/* CONTINUE BUTTON */

function continueGame(){

level++

if(level >= puzzles.length){

showPage("end-screen")

confetti({
particleCount:200,
spread:120
})

let music = document.getElementById("birthdayMusic")

music.play().catch(()=>{})

}
else{

showPage("game")

loadPuzzle()

}

}



/* FALLING DAFFODILS */

function startFlowers(){

for(let i=0;i<15;i++){

let flower = document.createElement("div")

flower.className = "fall-flower"

flower.innerText = "🌼"

flower.style.left = Math.random()*100 + "vw"

flower.style.animationDuration = (3+Math.random()*3) + "s"

document.body.appendChild(flower)

setTimeout(()=>flower.remove(),6000)

}

}



/* BLOW CANDLES */

function blowCandles(){

candles--

let candleDiv = document.getElementById("candles")

if(candles==2){

candleDiv.innerHTML = "🕯 🕯"

}
else if(candles==1){

candleDiv.innerHTML = "🕯"

}
else{

candleDiv.innerHTML = ""

let cake = document.getElementById("cake")

cake.innerHTML = "🍰"

document.getElementById("cakeText").innerText = "Tap the cake to eat it!"

cake.onclick = showBonus

}

}



/* BONUS PAGE */

function showBonus(){

showPage("bonus-screen")

confetti({
particleCount:200,
spread:120
})

}
