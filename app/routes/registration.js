const sequelize = require('sequelize');
const express = require('express');
const Storage = require('../module/storage');
const common = require('../module/storage/common');
const Constats = require('../module/constants');
const { transporter } = require('../module/mailer');
const { Helper } = require('../module/storage/helpers');

const router = express.Router();

router.post('/add', async (req, res) => {

    const reqData = req.body
    let obj = {};
    let auth = {};
    let user = {};
    let key = {};
    let setting = {};
        
    try {        
        if (reqData.regType == Constats.regType.REG) {
            if (reqData.emailType == Constats.accountType.EMAIL) {

                key = Helper.getCode(6)

                await transporter.sendMail({
                    from: 'nb85294@mail.ru',
                    to: reqData.login,
                    subject: 'регистрация',
                    text: 'greenHouse: ' + key + ' - код для регистрации.',
                })

                user = await Storage.models.AdminPanelUser.create({
                    code: key
                })
            }
        } 

        if (reqData.regType == Constats.regType.CODE) {

            let userCreate = await Storage.models.AdminPanelUser.findOne({
                id: reqData.id
            })

            if (reqData.key == user.code) {

                userCreate.update({
                    name: reqData.name,
                    login: reqData.login,
                    password: reqData.password
                })
                user = userCreate;
                
                setting = await Storage.models.Settings.create({
                    userId: user.id
                })

            } else {
                auth = 'unauthorized'
            }
        }

        obj = {
            user,
            auth,
            key,
            setting
        }

        common.response200(res, obj)

    } catch (err) {
        common.response404(res, err);
    }
});

router.delete('/delete', async (req, res) => {

    const reqData = req.body;

    try {
        
        await Storage.models.AdminPanelUser.destroy({
            id: reqData.id
        })

        common.response200(res)
    } catch (err) {
        common.response404(err, res)
    }
});

module.exports = router;