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
            item.y -= roadDetails.bottom+300;
        }

        item.y += player.speed; 
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.startGame = false;
    popup.classList.remove('hide');
    popup.innerHTML = `GAME OVER<br>YOUR FINAL SCORE IS : ${Math.round(player.score/40)}<br> CLICK HERE TO RESTART THE GAME AGAIN`;
    score.classList.add('hide');
}

function moveRunningCars(car){
    let runningCars = document.querySelectorAll('.runningCarDiv');
    let roadDetails = road.getBoundingClientRect();

    runningCars.forEach(function(item){
        if(gameOver(car,item)){
            endGame();
        }

        if(item.y >= roadDetails.bottom){
            item.y = -300;
            item.style.left = Math.floor(Math.random()*350) + "px";
        }

        if(Math.round(player.score/40) <= 50){
            item.y += player.speed;
            item.style.top = item.y + "px";
        }

        if(Math.round(player.score/40) > 50 && Math.round(player.score/40) <= 100){
            item.y += (player.speed+5);
            item.style.top = item.y + "px";
        }
        
        if(Math.round(player.score/40) > 100 && Math.round(player.score/40) <= 170){
            item.y += (player.speed+10);
            item.style.top = item.y + "px";
        }

        if(Math.round(player.score/40) > 170 && Math.round(player.score/40) <= 220){
            item.y += (player.speed+15);
            item.style.top = item.y + "px";
        }

        if(Math.round(player.score/40) > 220 && Math.round(player.score/40) <= 250){
            item.y += (player.speed+10);
            item.style.top = item.y + "px";
        }

        if(Math.round(player.score/40) > 250 && Math.round(player.score/40) <= 350){
            item.y += (player.speed+20);
            item.style.top = item.y + "px";
        }
        
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
        if(keys.ArrowRight && player.x<(roadDetails.width-65)) {player.x += player.speed}
        if(keys.ArrowDown && player.y<(roadDetails.bottom-90)) {player.y += player.speed}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerHTML = `SCORE : ${Math.round(player.score/40)}`;
    }
}

function startGame(){
    //road.classList.remove('hide');
    score.classList.remove('hide');
    popup.classList.add('hide');
    road.innerHTML = "";
    player.startGame = true;
    player.score = 0;
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

    for(let i=0;i<6;i++){
        let runningCar = document.createElement('div');
        runningCar.setAttribute('class','runningCarDiv');
        runningCar.y = ((i+1)*350) * -1;
        runningCar.style.top = runningCar.y + "px";
        
        ran = Math.ceil(Math.random()*4);
        runningCar.style.backgroundImage = "url('opp"+ran+".png')";
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