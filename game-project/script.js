const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const stage = []
function rngMachine() {
    return Math.floor(Math.random() * 700)
}
function getRotationTo(a, b) {
    return Math.atan2(a.y - b.y, b.x - a.x);
}
function spawnPlayer(obj) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, obj.startAngle, obj.endAngle, obj.counterclockwise);
    ctx.fill();
}
function spawnShot(obj) {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, obj.startAngle, obj.endAngle, obj.counterclockwise);
    ctx.fill();
}
function spawnEnemy() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(Math.floor(Math.random() * 700), Math.floor(Math.random() * 700), 50, 50);
}
function isColliding(a, b) {
    return a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.h + a.y > b.y
}
const mouse = {
    x: 0,
    y: 0,
    w: 25,
    h: 25,
    color: '#3c3c3c'
}

let player = {
    x: 500,
    y: 900,
    radius: 15,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    counterclockwise: false,
    speed: 15,
    color: 'red',
    canShoot: true,
    onSpawn() {
        if (player.up) {
            player.y -= player.speed
        }
        if (player.left) {
            player.x -= player.speed
        }
        if (player.right) {
            player.x += player.speed
        }
        if (player.down) {
            player.y += player.speed
        }
    }
}

let fireball = {
    x: player.x,
    y: player.y,
    radius: 5,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    counterclockwise: false,
    speed: 30,
    rotation: getRotationTo(player, mouse),
    color: 'blue',
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    }
}

const entities = [
    { type: 'EnemyA', x: rngMachine(), y: rngMachine(), size: 10, speed: 5, color: 'blue' },
    { type: 'EnemyB', x: rngMachine(), y: rngMachine(), size: 13, speed: 2, color: 'green' },
    { type: 'EnemyC', x: rngMachine(), y: rngMachine(), size: 16, speed: 1, color: 'yellow' },
    { type: 'BossA', x: rngMachine(), y: rngMachine(), size: 20, speed: 3, color: 'maroon' },
    { type: 'BossB', x: rngMachine(), y: rngMachine(), size: 35, speed: 2, color: 'blueviolet' },
    { type: 'BossC', x: rngMachine(), y: rngMachine(), size: 100, speed: 0, color: 'palevioletred' }
]

canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
})
canvas.addEventListener('mousedown', e => {
    player.clicking = true;
    spawnShot(fireball)
})
canvas.addEventListener('mouseup', e => {
    player.clicking = false;
})

document.addEventListener('keydown', function (event) {
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    spawnPlayer(player)
    spawnShot(fireball)
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)