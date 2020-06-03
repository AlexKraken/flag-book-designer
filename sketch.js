let flagSlider
let unitInputBox
let flags = []
//let ppi = ((102 * 5 / 4.5) / 2).toFixed(0)
let ppi = ((102 * 5 / 4.5)).toFixed(0)
let addFlagButton

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('display', 'block')

  flagSlider = createSlider(0, 100, 10, 1)
  unitInputBox = createInput(`${1/8}`, 'number')


  addFlagButton = createButton('Add Flag')
  addFlagButton.position(width - 100, height / 2)
  addFlagButton.size(90, 50)
  addFlagButton.mousePressed(() => addFlag(5 * ppi, ppi))
}

function draw() {
  background(255)

  bookCover(3 * ppi, 5 * ppi)

  const flagHeight = unitInputBox.value() * flagSlider.value()
  let gap = floor((5 * ppi - flags.length * (flagHeight * ppi)) / (flags.length + 1))
  //console.log(gap / ppi)
  for (const [index, flag] of flags.entries()) {
    flag.size(ppi * 5, flagHeight * ppi)
    flag.position(0, gap * (index + 1) + index * flagHeight * ppi)
  }

  updateFlagSlider()
  updateUnitInputBox()
  textSize(32)
  fill(0);
  text(flagHeight, width / 2, height - 80)
}

function bookCover(width, height) {
  fill(245)
  rect(0, 0, width, height)
}

function addFlag(width, height) {
  const flag = createButton('')
  flag.position(0, flags.length * height)
  flag.size(width, height)
  flag.mousePressed(() => {
    let r = hex(floor(random(255)), 2)
    let g = hex(floor(random(255)), 2)
    let b = hex(floor(random(255)), 2)
    flag.style('backgroundColor', `#${r}${g}${b}`)
  })
  flags.push(flag)
}

function updateFlagSlider() {
  flagSlider.position(100, height - 40)
  flagSlider.style('width', `${width/2}px`)
}

function updateUnitInputBox() {
  unitInputBox.position(20, height - 40)
  unitInputBox.style('width', `60px`)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Flag {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = 200
    this.height = 100
  }

  display(height) {
    rect(this.x, this.y, this.width, height * this.height)
  }
}