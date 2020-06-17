// var name = "Linda";
//
// function showAlert(){
// alert ('Hi ' + name);'
//
// }
//
// showAlert();

// const lTetromino = 'firstShape'
// const zTetromino = 'secondShape'
// const oTetromino = 'thirdShape'
// const iTetromino = 'fourthShape'
// const tTetromino = 'fifthShape'
//
// const tetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino]
//
// console.log(tetrominoes[4])

// function showAlert () {
// alert('You have been alerted')
// }
// showAlert()

// Learning array and a function
// cost name = ['Linda' 'Lamb']
// function showAlert(firstName, lastName) {
//   alert(name[0] + ' ' + name[1] + ' ' + ', you have been alerted!')
// }
// showAlert()

// Learning array for each loop
// let names = ['Jack', 'Belle', 'Mickey', 'Puppy']
//
// names.forEach(name => {
// console.log(name + ' is the best!')
//
// })

// learning splice in an array, ie mutate an array by removing and item or add an item anywehre in the array
// var planets ['Earth', 'Mars', 'Uranus', 'Pluto
//
// console.log(planets.splice(2,1))
//
// console.log(planets)
//
// console.log(planets.splice(2, 1, 'Moon', 'Pluto'))
// console.log(planets.splce(1)  // only one item remains, Earth

// For this above example is to help the tetris project
// The splice function will be used for erasing a row when tetris blocks are filled,
// add a row back, etc
// splice(startIndex, 0), concat(), and appendChild()
// var tetrominoes = ['tTetromino', 'zTetromino', 'lTetromino', 'oTetromino']
//
// // console.log(tetrominoes.splice(2,2))
//
// var shapes = ['circle', 'square', 'oval']
//
// //console.log(tetrominoes.concat(shapes))
// // will combined the 2 arrays together

var shapes = ['circle', 'square', 'triangle']

for (let i = 0; i < shapes.length; i++) {
  console.log(shapes[i])
}
