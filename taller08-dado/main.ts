let dado = 0
input.onGesture(Gesture.Shake, function () {
    dado = randint(1, 6)
    basic.showNumber(dado)
})
