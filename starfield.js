const WIDTH = 800
const HEIGHT = 600
const NumStars = 200
const StarSize = 3
const MaxDepth = 10
const Speed = 0.04
const stars = []

function init() {
    const canvas = document.createElement("canvas")
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx = canvas.getContext("2d")
    for (let x = 0; x < NumStars; x++) {
        stars.push(randomPoint(Math.random()))
    }
    document.body.appendChild(canvas)
    mainloop()
}

function rangeRandom(min, max) {
    return Math.random() * (max - min) + min
}

function randomPoint(zf) {
    return {
        x: rangeRandom(-WIDTH * 2, WIDTH * 2),
        y: rangeRandom(-HEIGHT * 2, HEIGHT * 2),
        z: zf * MaxDepth
    }
}

function update() {
    let sort = false;
    for (let x = 0; x < NumStars; x++) {
        stars[x].z -= Speed
        if (stars[x].z < 0) {
            Object.assign(stars[x], randomPoint(1))
            sort = true
        }
    }
    if (sort) {
        stars.sort((a, b) => b.z - a.z)
    }
}

function draw() {
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    const s = StarSize
    const sh = s / 2
    for (let x = 0; x < NumStars; x++) {
        const star = stars[x];
        // weak perspective projection
        const px = WIDTH * 0.5 + star.x / star.z
        const py = HEIGHT * 0.5 - star.y / star.z
        const col = ((MaxDepth - star.z) / MaxDepth) * 255
        ctx.fillStyle = `rgb(${col}, ${col}, ${col})`
        ctx.beginPath()
        ctx.arc(px - sh, py - sh, s, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }
}

function mainloop() {
    update()
    draw()
    requestAnimationFrame(mainloop)
}

init()