radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showArrow(ArrowNames.North)
    }
})
