const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const ammo = [];
const enemyAmmo = [];
const enemyQueue = [];

function getRotationTo(a, b) {
    return Math.atan2(a.y - b.y, b.x - a.x);
};
function drawEnemyElement(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.size, obj.size);
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
function rngMachine(variable) {
    return Math.floor(Math.random() * variable)
};
function spawnLogic(obj, arr) {
    if(Math.random() >= 0.5) {
        arr.push(obj)
    }
};


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
    hp: 20,
    x: 500,
    y: 900,
    radius: 15,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    counterclockwise: false,
    color: 'red',
    speed: 2.5,
    canShoot: true,
    onSpawn() {
        if (player.up && player.y > 30) {
            player.y -= player.speed
        }
        if (player.left && player.x > 30) {
            player.x -= player.speed
        }
        if (player.right && player.x < 970) {
            player.x += player.speed
        }
        if (player.down && player.y < 970) {
            player.y += player.speed
        }
    }
};
class PlayerShotMid {
    constructor() {
        this.color = 'yellow';
        this.x = player.x;
        this.y = player.y;
        this.radius = 10;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.counterclockwise = false;
        this.speed = 5;
        this.damage = 1
        this.rotation = getRotationTo(player, mouse);
        ammo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    };
};
class PlayerShotRight {
    constructor() {
        this.color = 'yellow';
        this.x = player.x+10;
        this.y = player.y;
        this.radius = 10;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.counterclockwise = false;
        this.speed = 5;
        this.damage = 1
        this.rotation = getRotationTo(player, mouse);
        ammo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation)+.3;
        this.y -= this.speed * Math.sin(this.rotation);
    };
};
class PlayerShotLeft {
    constructor() {
        this.color = 'yellow';
        this.x = player.x-10;
        this.y = player.y;
        this.radius = 10;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.counterclockwise = false;
        this.speed = 5;
        this.damage = 1
        this.rotation = getRotationTo(player, mouse);
        ammo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation)-.3;
        this.y -= this.speed * Math.sin(this.rotation);
    };
};

let enemyA = {
    hp: 15,
    x: rngMachine(950),
    y: rngMachine(950),
    size: 30,
    speed: .5,
    color: 'blue',
    canShoot: null,
    movement() {
        if (this.y < player.y) {
            this.y += this.speed
        }
        if (this.y > player.y) {
            this.y -= this.speed
        }
        if (this.x < player.x) {
            this.x += this.speed
        }
        if (this.x > player.x) {
            this.x -= this.speed
        }
    },
    collision() {
        if (this.y > 30) {
            this.y -= this.speed
        }
        if (this.x > 30) {
            this.x -= this.speed
        }
        if (this.x < 970) {
            this.x += this.speed
        }
        if (this.y < 970) {
            this.y += this.speed
        }
    }
};
let enemyB = {
    hp: 20,
    x: rngMachine(950),
    y: rngMachine(950),
    size: 30,
    speed: .9,
    color: 'pink',
    canShoot: null,
    movement() {
        if (this.y < player.y) {
            this.y += this.speed
        }
        if (this.y > player.y) {
            this.y -= this.speed
        }
        if (this.x < player.x) {
            this.x += this.speed
        }
        if (this.x > player.x) {
            this.x -= this.speed
        }
    },
    collision() {
        if (this.y > 30) {
            this.y -= this.speed
        }
        if (this.x > 30) {
            this.x -= this.speed
        }
        if (this.x < 970) {
            this.x += this.speed
        }
        if (this.y < 970) {
            this.y += this.speed
        }
    }
};
let enemyC = {
    hp: 10,
    x: rngMachine(950),
    y: rngMachine(950),
    size: 30,
    speed: 1.5,
    color: 'orange',
    canShoot: null,
    movement() {
        if (this.y < player.y) {
            this.y += this.speed
        }
        if (this.y > player.y) {
            this.y -= this.speed
        }
        if (this.x < player.x) {
            this.x += this.speed
        }
        if (this.x > player.x) {
            this.x -= this.speed
        }
    },
    collision() {
        if (this.y > 30) {
            this.y -= this.speed
        }
        if (this.x > 30) {
            this.x -= this.speed
        }
        if (this.x < 970) {
            this.x += this.speed
        }
        if (this.y < 970) {
            this.y += this.speed
        }
    }
};
let boss = {
    hp: 50,
    x: rngMachine(950),
    y: rngMachine(950),
    size: 100,
    speed: 1,
    color: 'maroon',
    canShoot: null,
    movement() {
        if (this.y < player.y) {
            this.y += this.speed
        }
        if (this.y > player.y) {
            this.y -= this.speed
        }
        if (this.x < player.x) {
            this.x += this.speed
        }
        if (this.x > player.x) {
            this.x -= this.speed
        }
    },
    collision() {
        if (this.y > 30) {
            this.y -= this.speed
        }
        if (this.x > 30) {
            this.x -= this.speed
        }
        if (this.x < 970) {
            this.x += this.speed
        }
        if (this.y < 970) {
            this.y += this.speed
        }
    }
};

spawnLogic(enemyA, enemyQueue)
spawnLogic(enemyB, enemyQueue)
spawnLogic(enemyC, enemyQueue)
spawnLogic(boss, enemyQueue)

if(enemyQueue.length === 0) {
    enemyQueue.push(boss)
}
enemyQueue.forEach(enemy => {
    if(enemyQueue.includes(enemy)) {
        enemy.canShoot = true
    } else {
        enemy.canShoot = false
    }
})


class EnemyShotA {
    constructor() {
        this.color = 'blue';
        this.x = enemyA.x + 10;
        this.y = enemyA.y + 5;
        this.size = 20;
        this.speed = 7;
        this.damage = 1;
        this.rotation = getRotationTo(this, player);
        enemyAmmo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    };
};
class EnemyShotB {
    constructor() {
        this.color = 'pink';
        this.x = enemyB.x + 10;
        this.y = enemyB.y + 5;
        this.size = 20
        this.speed = 4;
        this.damage = 3;
        this.rotation = getRotationTo(this, player);
        enemyAmmo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    };
};
class EnemyShotC {
    constructor() {
        this.color = 'orange';
        this.x = enemyC.x + 10;
        this.y = enemyC.y + 5;
        this.size = 20
        this.speed = 7;
        this.damage = 2.5;
        this.rotation = getRotationTo(this, player);
        enemyAmmo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    };
};
class BossShot {
    constructor() {
        this.color = 'maroon';
        this.x = boss.x + 10;
        this.y = boss.y + 5;
        this.size = 50
        this.speed = 7;
        this.damage = 5;
        this.rotation = getRotationTo(this, player);
        enemyAmmo.push(this);
    };
    onSpawn() {
        this.x += this.speed * Math.cos(this.rotation);
        this.y -= this.speed * Math.sin(this.rotation);
    };
};


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


function draw() {
    clearScreen();
    enemyAmmo.forEach(obj => {
        drawEnemyElement(obj);
        obj.onSpawn();
    });
    enemyQueue.forEach(obj => {
        drawEnemyElement(obj);
        obj.movement();
        obj.collision();
    });
    ammo.forEach(obj => {
        drawPlayerElement(obj);
        obj.onSpawn();
    });
    drawPlayerElement(player);
    player.onSpawn();

    if (enemyA.canShoot) {
        new EnemyShotA;
        enemyA.canShoot = false;
        setTimeout(() => enemyA.canShoot = true, 1200);
    }
    if (enemyB.canShoot) {
        new EnemyShotB;
        enemyB.canShoot = false;
        setTimeout(() => enemyB.canShoot = true, 850);
    }
    if (enemyC.canShoot) {
        new EnemyShotC;
        enemyC.canShoot = false;
        setTimeout(() => enemyC.canShoot = true, 350);
    }
    if (boss.canShoot) {
        new BossShot;
        boss.canShoot = false;
        setTimeout(() => boss.canShoot = true, 500);
    }
    
    if (player.clicking && player.canShoot) {
        new PlayerShotMid;
        new PlayerShotRight;
        new PlayerShotLeft;
        player.canShoot = false;
        setTimeout(() => player.canShoot = true, 250);
    }
    requestAnimationFrame(draw);
};
draw();