import crypto from 'crypto'

export const handleError = (error, res) => {
    res.status(500).json({
        message: 'An error ocurred',
        error
    })
}

export const generateHash = () => {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
}