const topic = '/nodejs/mqtt';

async function publish (greenHouse, client) {

    console.log('---------------------- Starting mqtt ----------------------')

    try { 
        
        client.subscribe([topic]);
        client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false, greenHouse });
        client.end();
        
    } catch (err) {
        console.trace();
        process.exit();
    }
}

async function message (client){
    client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})
}


module.exports = { publish, message }
