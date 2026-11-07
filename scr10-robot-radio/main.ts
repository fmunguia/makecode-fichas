radio.setGroup(7)
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        neZha.setMotorSpeed(neZha.MotorList.M1, 50)
        neZha.setMotorSpeed(neZha.MotorList.M2, 50)
        basic.pause(1000)
        neZha.stopAllMotor()
    }
})
