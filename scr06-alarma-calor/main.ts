basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (input.temperature() > 28) {
        basic.showIcon(IconNames.Sad)
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(1000)
})
