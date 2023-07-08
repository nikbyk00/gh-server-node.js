const express = require('express');
const Storage = require('../module/storage');
const common = require('../module/storage/common');
const  createHash = require('hash-generator');
const Constats = require('../module/constants');
const { transporter } = require('../module/mailer')
const { Helper } = require('../module/storage/helpers')

const router = express.Router()

router.post('/login', async (req, res) => {
        
    const reqData = req.body;
    let obj = {};
    let space = {};
    let room = {};

    try {

            const user = await Storage.models.AdminPanelUser.findOne({
                where: {
                    login: reqData.login,
                    password: reqData.password
                },
            });

            if (!user) {
                common.response404(res, 'unauthorized')
                return
            }

            const token = createHash(64);

            await Storage.models.AdminPanelUserToken.create({
                adminPanelUserId: user.id,
                token
            });

            if (user.spaceId !== null) {
                space = await Storage.models.Space.findOne({
                    where: {
                        id: user.spaceId
                    },
                    attributes: ['id']
                })
               
                room = await Storage.models.Room.findAll({
                    where: {
                        spaceId: space.id
                    },
                    attributes: ['id']
                })
            }
            obj = {
                space,
                room
            }

            common.response200(res, {
                user: {
                    userId: user.id,
                    login: user.login,
                    roles: user.roles,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    threeName: user.threeName,
                    spaceId: user.spaceId
                },
                oauthToken: {
                    token,
                    expiresIn: 3600,
                    tokenType: "Bearer"
                },
                obj
            })
        } catch (err) {
            common.response404(res, err);
        }
    });

router.get('/getUser', async (req,res) => {

    const reqData = req.body;

    try {
        const user = await Storage.models.AdminPanelUser.findOne({
            where: {
                id: reqData.id
            }
        })
        
        common.response200(user)
    } catch (err) {
        common.response404(res, err)
    }
});

router.post('/update', async (req,res) => {

    const reqData = req.body;

    try {
        const user = await Storage.models.AdminPanelUser.findOne({
            where: {
                id: reqData.id
            }
        })

        if (user !== null) {
            await user.update({
                firstName: reqData.firstName,
                lastName: reqData.lastName,
                threeName: reqData.threeName,
                login: reqData.login,
                password: reqData.password,
                sapceId: reqData.sapceId
            })
        }

        common.response200(res, user)

    } catch (err) {
        common.response404(res,err)
    }

});

router.post('/delete', async (req, res) => {

    const reqData = req.body;

    try {
        
        const user = await Storage.models.AdminPanelUser.destroy({
            id: reqData.id
        })

        common.response200(res, user)

    } catch (err) {
        common.response404(res, err)
    }
})

module.exports = router;