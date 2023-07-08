const express = require('express');
const Storage = require('../module/storage');
const common = require('../module/storage/common');

const router = express.Router()

//создание модели журнала
router.post('/create', async (req, res) => {
        
    const reqData = req.body;

    try {

        const journal = await Storage.models.Journal.create({
            date: reqData.date,
            time: reqData.time,
            spaceId: reqData.spaceId,
            event: reqData.event
        });

        common.response200(res, journal)

    } catch (err) {
        common.response404(res, err);
    }
});

//изменения модели журнала
router.post('/update', async (req, res) => {

    const reqData = req.body;

    try {

        const journal = await Storage.models.Journal.findOne({
            where: {
                id: reqData.id
            }
        })

        if (space != undefined) {
            await journal.update({
                date: reqData.date,
                time: reqData.time,
                spaceId: reqData.spaceId,
                event: reqData.event
            })
        }

        common.response200(res, journal)

    } catch (err) {
        common.response404(res, err)
    }

});

//получение всех записей
router.get('/getAll', async (req, res) => {

    const reqData = req.body;
    
    try {

        const journal = await Storage.models.Journal.findAll({
            where: {
                spaceId: reqData.spaceId
            }
        })

        common.response200(res, journal)

    } catch (err) {
        common.response404(res, err);
    }
});

//получение модели журнала
router.get('/get', async (req, res) => {

    const reqData = req.body;
    
    try {

        const journal = await Storage.models.Journal.findOne({
            where: {
                id: reqData.id
            }
        })    

        common.response200(res, journal)

    } catch (err) {
        common.response404(res, err);
    }
});

//удаление журнала
router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {

        const journal = await Storage.models.Journal.destroy({
            where: {
                id: reqData.id
            }
        })

        common.response200(res, journal)
    } catch (err) {
        common.response404(res, err);
    }
});


module.exports = router