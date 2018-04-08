import nodemailer from 'nodemailer'
import Debug from 'debug'

const debug = new Debug('server::mailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bernardo.pena.ramos@gmail.com',
        pass: '#2901&Nano'
    }
})

export const sendActivationEmail = (user) => {
    const mailOptions = {
        from: 'bernardo.pena.ramos@gmail.com',
        to: user.email,
        subject: 'Activate account',
        html: `
            <h1>Activate</h1>
            <a href="http://localhost:3000/api/v1/user/activate/${user.hashActivator}">http://localhost:3000/api/v1/user/activate/${user.hashActivator}</a>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            debug(error)
        } else {
            debug(info)
        }
    })
}