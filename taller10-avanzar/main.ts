input.onButtonPressed(Button.A, function () {
    neZha.setMotorSpeed(neZha.MotorList.M1, 50)
    neZha.setMotorSpeed(neZha.MotorList.M2, -50)
    basic.pause(2000)
    neZha.stopAllMotor()
})
