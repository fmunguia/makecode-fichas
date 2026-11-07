basic.forever(function () {
    if (PlanetX_Basic.ultrasoundSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.Distance_Unit_List.Distance_Unit_cm) < 15) {
        neZha.stopAllMotor()
    } else {
        neZha.setMotorSpeed(neZha.MotorList.M1, 40)
        neZha.setMotorSpeed(neZha.MotorList.M2, -40)
    }
})
