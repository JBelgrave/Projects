const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const startElement = document.querySelector('#startElement')
const startGameButton = document.querySelector('#startGameButton')
const scoreElement = document.querySelector('#scoreElement')
const endScore = document.querySelector('#endScore')
canvas.width = innerWidth
canvas.height = innerHeight
const friction = 0.98
let score = 0
let animationId = null
function getRotationTo(a, b) {
    return Math.atan2(a.y - b.y, b.x - a.x);
};
const mouse = {x: 0, y: 0,};
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }
    movement() {
        if (player.up && player.y >= 50) {
            player.y -= 2.5
        }
        if (player.down && player.y <= canvas.height - 50) {
            player.y += 2.5
        }
        if (player.left && player.x >= 50) {
            player.x -= 2.5
        }
        if (player.right && player.x <= canvas.width - 50) {
            player.x += 2.5
        }
    }
}
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.rotation = getRotationTo(player, mouse)
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x += 5 * Math.cos(this.rotation)
        this.y -= 5 * Math.sin(this.rotation)
    }
}
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.rotation = getRotationTo(this, player)
        this.canShoot = true
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x += Math.cos(this.rotation)
        this.y -= Math.sin(this.rotation)
    }
}
class EnemyProjectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.rotation = getRotationTo(this, player)
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x += 2 * Math.cos(this.rotation)
        this.y -= 2 * Math.sin(this.rotation)
    }
}
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }
    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}
let player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white')
let projectiles = []
let enemyProjectiles = []
let particles = []
let enemies = []
function init() {
    player = new Player(canvas.width / 2, canvas.height / 2, 10, 'white')
    projectiles = []
    enemyProjectiles = []
    particles = []
    enemies = []
    score = 0
    scoreElement.innerHTML = score
    endScore.innerHTML = score
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random()*(10-20)+20
        let x = null
        let y = null
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random()*360}, 50%, 50%)`
        const angle = Math.atan2(y - player.y, player.x - x)
        const velocity = {x: Math.cos(angle), y: Math.sin(angle)}
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 2500);
}

function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, .1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    player.movement()
    particles.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) {
            particles.splice(particleIndex, 1)
        } else {
            particle.update()
        }
    })
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update()
        console.log(projectiles)
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(projectileIndex, 1)
            }, 0);
        }
    })
    enemyProjectiles.forEach((enemyProjectile, enemyProjectileIndex) => {
        enemyProjectile.update()
        if (enemyProjectile.x + enemyProjectile.radius < 0 ||
            enemyProjectile.x - enemyProjectile.radius > canvas.width ||
            enemyProjectile.y + enemyProjectile.radius < 0 ||
            enemyProjectile.y - enemyProjectile.radius > canvas.height) {
            setTimeout(() => {
                enemyProjectiles.splice(enemyProjectileIndex, 1)
            }, 0);
        }
    })
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        if(enemy.canShoot) {
            enemyProjectiles.push(new EnemyProjectile(enemy.x, enemy.y, 5, enemy.color, enemyProjectiles.rotation))
            enemy.canShoot = false
            setTimeout(() => enemy.canShoot = true, 1000);
        }
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist - enemy.radius - player.radius < 1) {
            if(hp < 0) {
                cancelAnimationFrame(animationId)
                endScore.innerHTML = score
                startGameButton.innerText = 'Restart'
                startElement.style.display = 'flex'
            } else {
                hp -= 1
            }
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist - enemy.radius - projectile.radius < 1) {
                if (enemy.radius - 10 > 5) {
                    score += 100
                    scoreElement.innerHTML = score
                    gsap.to(enemy, {radius: enemy.radius - 10})
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0);
                } else {
                    score += 250
                    scoreElement.innerHTML = score
                    for (let i = 0; i < 8; i++) {
                        particles.push(new Particle(projectile.x, projectile.y, Math.random()*(3-1)+1, enemy.color, 
                        {x: (Math.random() - 0.5)*(Math.random()*8), 
                        y: (Math.random() - 0.5)*(Math.random()*8)}))
                    }
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0);
                }
            }
        })
        enemyProjectiles.forEach((enemyProjectile) => {
            const dist = Math.hypot(enemyProjectile.x - player.x, enemyProjectile.y - player.y)
            if (dist - enemyProjectile.radius - player.radius < 1) {
                    cancelAnimationFrame(animationId)
                    endScore.innerHTML = score
                    startGameButton.innerText = 'Restart'
                    startElement.style.display = 'flex'
            }
        })
    })
}

addEventListener('keydown', e => {
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
addEventListener('keyup', e => {
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
addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});
addEventListener('click', () => {
    projectiles.push(new Projectile(player.x, player.y, 5, 'white', projectiles.rotation))
})
startGameButton.addEventListener('click', () => {
    init()
    startElement.style.display = 'none'
    animate()
    spawnEnemies()
})