let personas = 0
basic.showNumber(personas)
input.onButtonPressed(Button.A, function () {
    personas += 1
    basic.showNumber(personas)
})
