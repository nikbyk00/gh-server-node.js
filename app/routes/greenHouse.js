const express = require('express');
const Storage = require('../module/storage');
const common = require('../module/storage/common');
const  { publish, message }  = require('../microcontroller/mqtt/greenhouse');
let admin = require('../microcontroller/mqtt/conection')

const router = express.Router()

//создание теплицы
router.post('/create', async (req, res) => {

    const reqData = req.body;
        
        try {

        const greenHouse = await Storage.models.GreenHouse.create({
            id: reqData.id,
            roomId: reqData.roomId,
            name: reqData.name,
            additionalTemperature: reqData.additionalTemperature,
            temperature: reqData.temperature,
            EC: reqData.ec,
            CO2: reqData.co,
            illuminance: reqData.illuminance,
            liquidLevel: reqData.liquidLevel,
            ventilation: reqData.ventilation,
            washingInterval: reqData.washingInterval,
            ph: reqData.ph
        });

        let client = await admin.connect(greenHouse.id);
        await publish(greenHouse, client);
        await message(client);

        common.response200(res, greenHouse)

    } catch (err) {
        common.response404(res, err);
    }
});

//изменения модели теплицы
router.post('/update', async (req, res) => {

    const reqData = req.body;

    try {

        const greenHouse = await Storage.models.GreenHouse.findOne({
            where: {
                id: reqData.id
            }
        })

        if (greenHouse != undefined) {
            await greenHouse.update({
                roomId: reqData.roomId,
                name: reqData.name,
                additionalTemperature: reqData.additionalTemperature,
                temperature: reqData.temperature,
                EC: reqData.ec,
                CO2: reqData.co,
                illuminance: reqData.illuminance,
                liquidLevel: reqData.liquidLevel,
                ventilation: reqData.ventilation,
                washingInterval: reqData.washingInterval,
                ph: reqData.ph
            })
        }

        await run(greenHouse);
        await message();

        common.response200(res, greenHouse)

    } catch (err) {
        common.response404(res, err)
    }

});

//получение модели теплицы
router.get('/get', async (req, res) => {

    const reqData = req.body;
    
    try {

        const greenHouse = await Storage.models.GreenHouse.findOne({
            where: {
                id: reqData.id
            }
        })    

        common.response200(res, greenHouse)

    } catch (err) {
        common.response404(res, err);
    }
});

//удаление теплицы
router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {

        const greenHouse = await Storage.models.GreenHouse.destroy({
            where: {
                id: reqData.id
            }
        })

        common.response200(res, greenHouse)
    } catch (err) {
        common.response404(res, err);
    }
});

module.exports = router;