basic.forever(function () {
    if (input.lightLevel() < 50) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.clearScreen()
    }
})
