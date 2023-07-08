const {v4, uuidv4} = require('uuid')

class Helper {
    static getCurrentDateInMS() {
        return (new Date()).getTime()
    }

    static getUUID() {
        return v4().replace(/\-/ig,'')
    }

    static getUUIDV4() {
        return uuidv4();
    }

    static getPassword(len) {
        let password = "";
        let symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < len; i++) {
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return password;
    }

    static getKey(len) {
        let key = "";
        let symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < len; i++) {
            key += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return key;
    }

    static getCode(len) {
        let code = "";
        let symbols = "0123456789";
        for (let i = 0; i < len; i++) {
            code += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return code;
    }
}

module.exports = { Helper }