basic.showIcon(IconNames.Heart)
basic.forever(function () {
    basic.showNumber(input.temperature())
    if (input.temperature() > 28) {
        music.playTone(523, music.beat(BeatFraction.Whole))
    }
})
