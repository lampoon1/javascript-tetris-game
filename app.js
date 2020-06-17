document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  // console.log(squares)

  // The Tetrominoes: getting all the shapes in their rotations
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]
  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // randomly select a Tetrmini and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]
  // console.log(theTetrominoes[0][0])
  // console.log(random)

  // draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tetromino move down every second
  // timerId = setInterval(moveDown, 1000)

  // assign functions to keyCodes: press down arrow will move moveDown
  // press left arrow will move
  // press up arrow will rotate
  // press right arrow keyboard key will move right
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)

  // move down a tetromino function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // freeze funtion to stop the tetromino using if statement
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  // move tetromino left, unless if at the edge
  // using Math functions: if index is 10, at left edge, stop moving left
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -=1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

  // designing what keyboard keys to press for moveLeft and moveRight functions
  // each keyboard keys has its key code (to learn what keycode go to keycode.info)
  // adding code above to allow pressing keyboard keys to allow move down/left/right.

  // move tetromino right, unless if at the edge or at a blockage
  // using Math functions: if index is 9, at right edge, stop moving right
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if (!isAtRightEdge) currentPosition +=1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  // rotate the tetromino
  function rotate() {
    undraw()
    currentRotation ++
    if (currentRotation === current.length) {
      // if the current rotation gets to 4, make it go back to 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  // show up-next tetromino in the mini-grid ScoreDisplay
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // the tetrominoes without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], // tTetromino
    [0, 1, displayWidth, displayWidth+1], // oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] // iTetromino
  ]

  // display the shape in the mini-grid display
  function displayShape() {
    // remove any trace of a tetromino from the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  // add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
      addScore()
    }
  })

  // add score to the game console
  function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
        })
        const squaresRemoved = squares.splice(i, width)
        console.log(squaresRemoved)
      }
    }
  }

// end of app.js javascript file...
})
