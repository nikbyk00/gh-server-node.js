const express = require('express')
const Storage = require('../module/storage')
const common = require('../module/storage/common')

const router = express.Router()

//создание модели комнаты
router.post('/create', async (req, res) => {
        
    const reqData = req.body;

    try {
    
        const room = await Storage.models.Room.create({
            roomName: reqData.roomName,
            spaceId: reqData.spaceId
        });

        common.response200(res, room)

    } catch (err) {
        common.response404(res, err);
    }
});

//изменения модели комнаты
router.post('/update', async (req, res) => {

    const reqData = req.body;

    try {

        const room = await Storage.models.Room.findOne({
            where: {
                id: reqData.id
            }
        })

        if (room != undefined) {
            await room.update({
                roomName: reqData.roomName
            })
        }

        common.response200(res, room)

    } catch (err) {
        common.response404(res, err)
    }

});

//получение модели комнаты
router.get('/get', async (req, res) => {

    const reqData = req.body;
    
    try {

        const room = await Storage.models.Room.findOne({
            where: {
                id: reqData.id
            }
        })    

        common.response200(res, room)

    } catch (err) {
        common.response404(res, err);
    }
});

//получение всех комнат по spaceId
router.get('/getAll', async (req, res) => {
    
    const reqData = req.body;
    let obj = {};
    let greenHouse = {};

    try {

        const room = await Storage.models.Room.findOne({
            where: {
                id: reqData.id
            }
        })

        if (room !== null) {
            greenHouse = await Storage.models.GreenHouse.findAll({
                where: {
                    roomId: room.id
                }
            })
        }

        obj = {
            room,
            greenHouse
        }
        
        common.response200(res, obj)

    } catch (err) {
        common.response404(res, err)
    }
});

//удаление комнаты
router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {

        const room = await Storage.models.Room.destroy({
            where: {
                id: reqData.id
            }
        })

        common.response200(res, room)
    } catch (err) {
        common.response404(res, err);
    }
});

module.exports = router;