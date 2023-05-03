const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
function rngMachine(){
    return Math.floor(Math.random()*900)
}

let player = {
    type: 'Player',
    x: 500,
    y: 900,
    radius: 15, 
    startAngle: 0, 
    endAngle: 2 * Math.PI, 
    counterclockwise: false, 
    speed: 5, 
    color: 'red'
}

const entities = [
    {type: 'EnemyA', x: rngMachine(), y: rngMachine(), size: 10, speed: 5, color: 'blue'},
    {type: 'EnemyB', x: rngMachine(), y: rngMachine(), size: 13, speed: 2, color: 'green'},
    {type: 'EnemyC', x: rngMachine(), y: rngMachine(), size: 16, speed: 1, color: 'yellow'},
    {type: 'BossA', x: rngMachine(), y: rngMachine(), size: 20, speed: 3, color: 'maroon'},
    {type: 'BossB', x: rngMachine(), y: rngMachine(), size: 35, speed: 2, color: 'blueviolet'},
    {type: 'BossC', x: rngMachine(), y: rngMachine(), size: 100, speed: 0, color: 'palevioletred'}
]

function spawnPlayer(obj){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, obj.startAngle, obj.endAngle, obj.counterclockwise);
    ctx.fill();
}

function spawnEnemy(obj){
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
}



document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
        default:
            break;
    }
});

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    spawnPlayer(player)
    spawnEnemy(entities[0])
    spawnEnemy(entities[1])
    spawnEnemy(entities[2])
    spawnEnemy(entities[3])
    spawnEnemy(entities[4])
    spawnEnemy(entities[5])
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
