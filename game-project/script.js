const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

function getRotationTo(a, b) {
    return Math.atan2(a.y - b.y, b.x - a.x);
};

function isColliding(a, b) {
    return a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.h + a.y > b.y
};

function drawEnemyElement(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
};

function drawPlayerElement(obj) {
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, obj.startAngle, obj.endAngle, obj.counterclockwise);
    ctx.fill();
};

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

const ammo = [];
const mouse = {
    x: 0,
    y: 0,
    radius: 5,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    counterclockwise: false,
    color: 'blue'
};

let player = {
    x: 500,
    y: 900,
    radius: 15,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    counterclockwise: false,
    color: 'red',
    speed: 7.5,
    canShoot: true,
    onEnterFrame() {
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
};

class Shot {
    constructor() {
        this.color = 'darkred';
        this.x = player.x;
        this.y = player.y;
        this.radius = 10,
        this.startAngle = 0,
        this.endAngle = 2 * Math.PI,
        this.counterclockwise = false,
        this.speed = 15;
        this.rotation = getRotationTo(player, mouse);
        ammo.push(this);
    }
    onEnterFrame() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    }
};

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.left = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        player.right = true;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        player.up = true;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        player.down = true;
    }
});

window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.left = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
        player.right = false;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        player.up = false;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        player.down = false;
    }
});

canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});
canvas.addEventListener('mousedown', e => {
    player.clicking = true;
});
canvas.addEventListener('mouseup', e => {
    player.clicking = false;
});

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

const FPS = 60;
function draw() {
    clearScreen();
    ammo.forEach(obj => {
        drawPlayerElement(obj);
        obj.onEnterFrame();
    });

    drawPlayerElement(player);
    player.onEnterFrame();
    //drawPlayerElement(mouse);
    if (player.clicking && player.canShoot) {
        new Shot;
        player.canShoot = false;
        setTimeout(() => player.canShoot = true, 100);
    }
};
draw();
let gameLoop = setInterval(draw, 1000 / FPS);