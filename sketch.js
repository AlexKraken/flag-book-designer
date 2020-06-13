let flagSlider, unitInputBox
let flagWidthBox, flagHeightBox
let addFlagButton, removeFlagButton
let bookWidthBox, bookHeightBox

const colorPickerArray = []
const bookDimensions = [, ] // [width, height] in inches
const PPI = ((102 * 5 / 4.5) / 2).toFixed(0) // Half-scale on 13" Macbook Pro Retina
const scaleByPPI = x => {
  return x * PPI
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  createInterface()
  updateInterface()
}

function draw() {
  background(255)

  bookDimensions[0] = bookWidthBox.value()
  bookDimensions[1] = bookHeightBox.value()

  addBookCover(...bookDimensions.map(scaleByPPI))

  const flagHeight = unitInputBox.value() * flagSlider.value()
  const gap = floor((bookDimensions[1] * PPI - colorPickerArray.length *
    (flagHeight * PPI)) / (colorPickerArray.length + 1))

  for (const [index, colorPicker] of colorPickerArray.entries()) {
    colorPickerArray[index].position(PPI * bookDimensions[0], gap * (index + 1) + index * flagHeight * PPI)
    colorPickerArray[index].style('width', `${PPI * bookDimensions[0]}px`)
    colorPickerArray[index].style('height', `${flagHeight * PPI}px`)

    rect(0, gap * (index + 1) + index * flagHeight * PPI, PPI * bookDimensions[0], flagHeight * PPI)
  }

  textSize(32)
  fill(0)
  textAlign(CENTER)
  text(`Flag Height: ${flagHeight}" Gap Width: ${(gap/PPI).toFixed(3)}"`, width / 2, height - 80)

  textSize(16)
  fill(0)
  textAlign(CENTER)

  text(`Book Dimensions: ${bookDimensions[0]}" x ${bookDimensions[1]}"`, width - 100, 25)
}

function createInterface() {
  flagSlider = createSlider(1, 100, 10, 1)
  unitInputBox = createInput(`${1/8}`, 'number')
  flagWidthBox = createInput(`${0}`, 'number')
  flagHeightBox = createInput(`${0}`, 'number')
  bookWidthBox = createInput(`${3}`, 'number')
  bookHeightBox = createInput(`${5}`, 'number')

  addFlagButton = createButton('Add Flag')
  addFlagButton.mousePressed(() => colorPickerArray.push(createColorPicker()))

  removeFlagButton = createButton('Remove Flag')
  removeFlagButton.mousePressed(() => colorPickerArray.pop().remove())
}

function updateInterface() {
  updateElement(flagSlider, [width / 4, height - 40], ['width', `${width/2}px`])

  updateElement(unitInputBox, [width / 4 - 70, height - 40], ['width', '60px'])

  updateElement(flagHeightBox, [width - 100, 250], ['width', '60px'])
  updateElement(flagWidthBox, [width - 100, 225], ['width', '60px'])

  updateElement(addFlagButton, [width - 100, 150], ['width', '60px'])
  updateElement(removeFlagButton, [width - 180, 150], ['width', '60px'])

  updateElement(bookWidthBox, [width - 100, 50], ['width', '60px'])
  updateElement(bookHeightBox, [width - 100, 75], ['width', '60px'])
}

function addBookCover(width, height) {
  fill(245)
  rect(0, 0, width, height)
}

function updateElement(element, position, style) {
  element.position(...position)
  element.style(...style)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  updateInterface()
}