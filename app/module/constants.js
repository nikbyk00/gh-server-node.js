
class Constats {
    static USER_PASSWORD_LENGTH = 8;

    static accountType = {
        EMAIL: 'email',
        PHONE_NUMBER: 'phoneNumber'
    };

    static accountRole = {
        AUTHOR: 'admin',
        STUDENT: 'user'
    };

    static regType = {
        REG: 'reg',
        CODE: 'code'
    }
}

module.exports = Constats;