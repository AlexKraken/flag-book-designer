let flagSlider, unitInputBox
let flagWidthBox, flagHeightBox
let addFlagButton, addFlagButton2
let colorPickerArray = []

const flagArray = []
const flags = []
const bookDimensions = [3, 5] // [width, height] in inches
const PPI = ((102 * 5 / 4.5) / 2).toFixed(0) // Half-scale
const scaleByPPI = x => {
  return x * PPI
}

function createInterface() {
  flagSlider = createSlider(0, 100, 10, 1)
  unitInputBox = createInput(`${1/8}`, 'number')
  flagWidthBox = createInput(`${0}`, 'number')
  flagHeightBox = createInput(`${0}`, 'number')

  addFlagButton = createButton('Add Flag')
  addFlagButton.position(width - 100, height / 4)
  addFlagButton.size(90, 50)
  addFlagButton.mousePressed(() => addFlag())
}

function updateInterface() {

  updateUnitInputBox()
  //updateFlagSlider()
  updateInputBox(flagSlider, [width / 4, height - 40], ['width', `${width/2}px`])
  updateInputBox(unitInputBox, [width / 4 - 70, height - 40], ['width', '60px'])
  updateInputBox(flagHeightBox, [width - 100, height / 2 - 60], ['width', '60px'])
  updateInputBox(flagWidthBox, [width - 100, height / 2 - 90], ['width', '60px'])
  updateInputBox(addFlagButton, [width - 100, height / 4], ['width', '60px'])
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('display', 'block')

  createInterface()
}

function draw() {
  background(255)

  addBookCover(...bookDimensions.map(scaleByPPI))

  const flagHeight = unitInputBox.value() * flagSlider.value()
  let gap = floor((5 * PPI - flags.length * (flagHeight * PPI)) / (flags.length + 1))

  for (const [index, flag] of flags.entries()) {
    flag.size(PPI * 5, flagHeight * PPI)
    flag.position(0, gap * (index + 1) + index * flagHeight * PPI)
    colorPickerArray[index].position(PPI * 5 + 10, gap * (index + 1) + index * flagHeight * PPI)
    colorPickerArray[index].style('width', `${PPI * 5}px`)
    colorPickerArray[index].style('height', `${flagHeight * PPI}px`)
  }

  updateInterface()

  updateFlags(flagArray)

  textSize(32)
  fill(0);
  text(flagHeight, width / 2, height - 80)
}

function updateFlags() {

}

function addBookCover(width, height) {
  fill(245)
  rect(0, 0, width, height)
}

function addFlag() {
  const flag = createButton('')
  const colorPicker = createColorPicker('black')

  colorPicker.position(0, flags.length * height)

  colorPickerArray.push(colorPicker)

  flag.position(0, flags.length * height)
  flag.size(flagWidthBox.value() * PPI, flagHeightBox.value() * PPI)
  flag.mousePressed(() => {
    let r = hex(floor(random(255)), 2)
    let g = hex(floor(random(255)), 2)
    let b = hex(floor(random(255)), 2)
    flag.style('backgroundColor', `#${r}${g}${b}`)
  })
  flags.push(flag)
}

function addFlag(width, height) {
  const flag = createButton('')
  const colorPicker = createColorPicker()

  colorPicker.position(width, flags.length * height)
  colorPickerArray.push(colorPicker)
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
  flagSlider.position(width / 4, height - 40)
  flagSlider.style('width', `${width/2}px`)
}

function updateUnitInputBox() {
  unitInputBox.position(20, height - 40)
  unitInputBox.style('width', `60px`)
}

function updateInputBox(inputBox, position, style) {
  inputBox.position(...position)
  inputBox.style(...style)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}