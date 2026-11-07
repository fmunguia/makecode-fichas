basic.forever(function () {
    if (PlanetX_Basic.ultrasoundSensor(PlanetX_Basic.DigitalRJPin.J1, PlanetX_Basic.Distance_Unit_List.Distance_Unit_cm) < 10) {
        neZha.setServoAngel(neZha.ServoTypeList._180, neZha.ServoList.S1, 90)
    } else {
        neZha.setServoAngel(neZha.ServoTypeList._180, neZha.ServoList.S1, 0)
    }
})
