let tirada = 0
input.onGesture(Gesture.Shake, function () {
    tirada = randint(1, 6)
    for (let index = 0; index < 3; index++) {
        basic.showIcon(IconNames.Square)
        basic.clearScreen()
    }
    basic.showNumber(tirada)
    music.playTone(523, music.beat(BeatFraction.Quarter))
})
