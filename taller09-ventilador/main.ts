basic.forever(function () {
    if (input.temperature() > 25) {
        neZha.setMotorSpeed(neZha.MotorList.M1, 80)
    } else {
        neZha.setMotorSpeed(neZha.MotorList.M1, 0)
    }
    basic.pause(500)
})
