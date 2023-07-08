const express = require('express')
const Storage = require('../module/storage')
const common = require('../module/storage/common')

const router = express.Router()

//создание модели помещения
router.post('/create', async (req, res) => {
        
    const reqData = req.body;

    try {

        const space = await Storage.models.Space.create({
            spaceName: reqData.spaceName,
            userId: reqData.userId
        });

        const user = await Storage.models.AdminPanelUser.findOne({
            where: {
                id: space.userId
            }
        })

        await user.update({
            spaceId: space.id
        })

        common.response200(res, space)

    } catch (err) {
        common.response404(res, err);
    }
});

//изменения модели помещения
router.post('/update', async (req, res) => {

    const reqData = req.body;

    try {

        const space = await Storage.models.Space.findOne({
            where: {
                id: reqData.id
            }
        })

        if (space != undefined) {
            await space.update({
                spaceName: reqData.spaceName,
                userId: reqData.userId
            })
        }

        common.response200(res, space)

    } catch (err) {
        common.response404(res, err)
    }

});

//получение модели помещения
router.get('/get', async (req, res) => {

    const reqData = req.body;
    let room = {};
    let obj = {};
    
    try {

        const space = await Storage.models.Space.findOne({
            where: {
                id: reqData.id
            }
        })  
        
        if (space !== null) {
            room = await Storage.models.Room.findAll({
                where: {
                spaceId: space.id
                }
            })
        }

        obj = {
            space,
            room
        }

        common.response200(res, obj)

    } catch (err) {
        common.response404(res, err);
    }
});

//получения модели всех помещения
router.get('/getAll', async (req, res) => {

    const reqData = req.body;
  
    try {

        const space = await Storage.models.Space.findAll({
            where: {
                userId: reqData.userId
            }
        })

        common.response200(res, space)

    } catch (err) {
        common.response404(res, err);
    }
});

//удаление помещения 
router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {

        const space = await Storage.models.Space.destroy({
            where: {
                id: reqData.id
            }
        })

        common.response200(res, space)
    } catch (err) {
        common.response404(res, err);
    }
});


module.exports = router;