const mqtt = require('mqtt');
const clientId = 'broker.emqx.io'

class admin {

    static async connect (url){
        let connectUrl = `mqtt://${url}`;
        let client = mqtt.connect(connectUrl, {
          clientId,
          clean: true,
          connectTimeout: 4000,
          username: 'emqx',
          password: 'public',
          reconnectPeriod: 1000,
        })
        return client
    }
}

module.exports =  admin