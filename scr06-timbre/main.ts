input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.QuarterNote)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.clearScreen()
})
