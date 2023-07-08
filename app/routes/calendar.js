const express = require('express')
const Storage = require('../module/storage')
const common = require('../module/storage/common')

const router = express.Router()

//создание модель
router.post('/create', async (req, res) => {
        
    const reqData = req.body;

    try {

        const calendar = await Storage.models.Calendar.create({
            date: reqData.date,
            maturationDate: reqData.maturationDate,
            eventName: reqData.eventName,
            event: reqData.event,
            greenHouseId: reqData.greenHouseId
        });

        common.response200(res, calendar)

    } catch (err) {
        common.response404(res, err);
    }
});

//изменения модели 
router.post('/update', async (req, res) => {

    const reqData = req.body;

    try {

        const calendar = await Storage.models.Calendar.findOne({
            where: {
                id: reqData.id
            }
        })

        if (calendar != undefined) {
            await calendar.update({
                date: reqData.date,
                maturationDate: reqData.maturationDate,
                eventName: reqData.eventName,
                event: reqData.event,
                greenHouseId: reqData.greenHouseId
            })
        }

        common.response200(res, calendar)

    } catch (err) {
        common.response404(res, err)
    }

});

//получение модели 
router.get('/get', async (req, res) => {

    const reqData = req.body;
    
    try {

        const calendar = await Storage.models.Calendar.findOne({
            where: {
                id: reqData.id
            }
        })    

        common.response200(res, calendar)

    } catch (err) {
        common.response404(res, err);
    }
});

//удаление 
router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {

        const calendar = await Storage.models.Calendar.destroy({
            where: {
                id: reqData.id
            }
        })

        common.response200(res, calendar)
    } catch (err) {
        common.response404(res, err);
    }
});

module.exports = router;