class Common {
    constructor() {
    }

    static response401(res, data = { result: 'unauthorized' }) {
        res.status(401).json({ result: data });
    }

    static response404(res, err) {
        console.error(new Error(err));
        err = err.message || err
        if (typeof (err) == 'object') {
            err = JSON.stringify(err)
        }

        res.status(404).json({ result: err });
    };

    static response200(res, data = { result: 'ok' }) {
        res.json(data);
    };
    
    static async adminPanelAuthorization(req, res, next) {
        
    }
}

module.exports = Common