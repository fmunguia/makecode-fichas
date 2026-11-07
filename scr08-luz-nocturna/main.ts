let luz = 0
let umbral = 40
basic.forever(function () {
    luz = input.lightLevel()
    if (luz < umbral) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    basic.pause(100)
})
