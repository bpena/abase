import crypto from 'crypto'

export const handleError = (errCode, errName, errMsg, res) => {
    res.status(errCode).json({
        errName,
        errMsg
    })
}

export const generateHash = () => {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}