const gridElement = document.getElementById('grid')
const warningElement = document.getElementById('warning')
const scoreElement = document.getElementById('score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const userStartPosition = [230, 10]
const ballStartPosition = [270, 40]
const boardWidth = 560
const boardHeight = 300
let userCurrentPosition = userStartPosition
let ballCurrentPosition = ballStartPosition
let interval 
let xDir = 2
let yDir = 2
let score = 0

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(10, 180),
    new Block(120, 180),
    new Block(230, 180),
    new Block(340, 180),
    new Block(450, 180)
]
const createBlocks = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = `${blocks[i].bottomLeft[0]}px`
    block.style.bottom = `${blocks[i].bottomLeft[1]}px`
    gridElement.appendChild(block)
  }
}
const renderPaddle = () => {
    user.style.left = `${userCurrentPosition[0]}px`
    user.style.bottom = `${userCurrentPosition[1]}px`
}
const renderBall = () => {
    ball.style.left = `${ballCurrentPosition[0]}px`
    ball.style.bottom = `${ballCurrentPosition[1]}px`
}
const movePaddle = e => {
    switch (e.key){
        case 'ArrowLeft':
            if (userCurrentPosition[0] > 0 ) {
                userCurrentPosition[0] -= 10 
                renderPaddle()
            }
        break;
        case 'ArrowRight':
            if (userCurrentPosition[0] < boardWidth - blockWidth) {
                userCurrentPosition[0] += 10 
                renderPaddle()
            }
        break;
    }
}
const moveBall = () => {
    ballCurrentPosition[0] += xDir
    ballCurrentPosition[1] += yDir
    renderBall()
    checkCollisions()
}
const changeDir = () => {
    if (xDir === 2 && yDir === 2) {
        yDir = -2
        return 
    }
    if (xDir === 2 && yDir === -2) {
        xDir = -2
        return 
    }
    if (xDir === -2 && yDir === -2) {
        yDir = 2
        return 
    }
    if (xDir === -2 && yDir === 2) {
        xDir = 2
        return 
    }
}
const checkCollisions = () => {
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] && (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDir()
            score++
            scoreElement.innerText = `Score: ${score}`
        }        
    }

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0) {
        changeDir()
    }
    if (ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth && ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight) {
        changeDir()
    }
    if (ballCurrentPosition[1] <= 0){
        clearInterval(interval)
        warningElement.innerText = 'Game Over'
        document.removeEventListener('keydown', movePaddle)
    }
    if (blocks.length == 0) {
        clearInterval(interval)
        warningElement.innerText = 'You Win!'
        document.removeEventListener('keydown', movePaddle)

    }
}

interval = setInterval(moveBall, 30)

const ball = document.createElement('div')
ball.classList.add('ball')
gridElement.appendChild(ball)
const user = document.createElement('div')
user.classList.add('paddle')
gridElement.appendChild(user)
renderPaddle()
renderBall()




document.addEventListener('keydown', movePaddle)
createBlocks()
