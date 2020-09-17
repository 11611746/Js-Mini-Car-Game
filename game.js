const score = document.querySelector('.scoreDiv');
const popup = document.querySelector('.popupDiv');
const road = document.querySelector('.roadDiv');

popup.addEventListener('click',startGame);

let player = { speed : 5 };

function gameOver(positionPlayer,positionOpp){
    aRect = positionPlayer.getBoundingClientRect();
    bRect = positionOpp.getBoundingClientRect();
    return !((aRect.bottom<bRect.top) || (aRect.top>bRect.bottom) || (aRect.left>bRect.right) || (aRect.right<bRect.left))
}

function moveLines(){
    let lines = document.querySelectorAll('.roadLinesDiv');
    let roadDetails = road.getBoundingClientRect();

    lines.forEach(function(item){
        if(item.y >= roadDetails.bottom){
            item.y -= roadDetails.bottom+250;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveRunningCars(car){
    let runningCars = document.querySelectorAll('.runningCarDiv');
    let roadDetails = road.getBoundingClientRect();

    runningCars.forEach(function(item){
        if(gameOver(car,item)){
            console.log("Game Over");
        }

        if(item.y >= roadDetails.bottom){
            item.y -= roadDetails.bottom+50;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame(){
    let car = document.querySelector('.car');

    let roadDetails = road.getBoundingClientRect(); 

    if(player.startGame){
        
        moveLines();
        moveRunningCars(car);

        if(keys.ArrowUp && player.y>(roadDetails.top+100)) {player.y -= player.speed}
        if(keys.ArrowLeft && player.x>0) {player.x -= player.speed}
        if(keys.ArrowRight && player.x<(roadDetails.width-50)) {player.x += player.speed}
        if(keys.ArrowDown && player.y<(roadDetails.bottom-70)) {player.y += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(playGame);
    }
}

function startGame(){
    road.classList.remove('hide');
    popup.classList.add('hide');
    player.startGame = true;
    window.requestAnimationFrame(playGame);

    for(let i=0;i<8;i++){
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class','roadLinesDiv');
        roadLines.y = (i*150);
        roadLines.style.top = roadLines.y + "px";
        road.appendChild(roadLines);
    }
    
    let car = document.createElement('div');
    car.setAttribute('class','car');
    road.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(let i=0;i<4;i++){
        let runningCar = document.createElement('div');
        runningCar.setAttribute('class','runningCarDiv');
        runningCar.y = (i*200);
        runningCar.style.top = runningCar.y + "px";
        runningCar.style.background = '#64958f';
        runningCar.style.left = Math.floor(Math.random()*350) + "px";
        road.appendChild(runningCar);
    }
}

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true;
    //console.log(e.key);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key);
}