import nodemailer from 'nodemailer'
import Debug from 'debug'

const debug = new Debug('server::mailer')

const appName = 'bbase'
const appUrl = 'http://bpena.xyz'
const logoUrl = ''

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bernardo.pena.ramos@gmail.com',
        pass: '#2901&Nano'
    }
})

export const sendActivationEmail = (user) => {
    const activationUrl = `http://localhost:3000/api/v1/user/activate/${user.hashActivator}`
    const mailOptions = {
        from: 'bernardo.pena.ramos@gmail.com',
        to: user.email,
        subject: 'Activate account',
        html: `
            <table style="border-spacing:0;border-collapse:collapse;font-family:proxima-nova,'helvetica neue',helvetica,arial,geneva,sans-serif;height:100%;width:600px;color:#4c4c4c;font-size:15px;line-height:150%;background:#ffffff;margin:40px 0;padding:0;border:0">
                <tbody>
                    <tr style="vertical-align:top;padding:0">
                        <td align="center" valign="top" style="vertical-align:top;padding:0 40px">
                            <table style="border-spacing:0;border-collapse:collapse;font-family:proxima-nova,'helvetica neue',helvetica,arial,geneva,sans-serif;height:100%;width:100%;background:#ffffff;margin:0;padding:0;border:0">
                                <tbody>
                                    <tr style="vertical-align:top;padding:0">
                                        <td style="vertical-align:top;text-align:left;padding:0" align="left" valign="top">
                                            <h1 style="color:#6e5baa;display:block;font-family:hybrea,proxima-nova,'helvetica neue',helvetica,arial,geneva,sans-serif;font-size:32px;font-weight:200;text-align:left;margin:0 0 40px" align="left">
                                                <img src="${logoUrl}" alt="${appName}" width="120" height="42" style="outline:none;text-decoration:none;border:0" class="CToWUd">
                                            </h1>

                                            <p style="margin:20px 0">
                                                Thanks for signing up with ${appName}! You must follow this link to <span class="il">activate</span> your account:</p>

                                            <p style="margin:20px 0">
                                                <a href="${activationUrl}" style="color:#6e5baa" target="_blank" 
                                                    data-saferedirecturl="https://www.google.com/url?hl=es&amp;q=${activationUrl}&amp;source=gmail&amp;ust=1523308870817000&amp;usg=AFQjCNHgJC1Lz2J358UuQgmsWWLGxFNZqQ">${activationUrl}</a>
                                            </p>
                                            
                                            <p style="margin:20px 0">Have fun, and don't hesitate to contact us with your feedback.</p>

                                            <p style="margin:20px 0">
                                                The <b>${appName}</b> Team<br>
                                                <a href="${appUrl}" style="color:#6e5baa" target="_blank" 
                                                    data-saferedirecturl="https://www.google.com/url?hl=es&amp;q=${appUrl}&amp;source=gmail&amp;ust=1523308870817000&amp;usg=AFQjCNEm3vLHPNGRp6wnmfpw4pCu02Gtlg">${appUrl}</a>
                                            </p>
                                            <p></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="vertical-align:top;padding:0">
                        <td align="center" valign="top" style="vertical-align:top;padding:0 40px">
                            <table style="border-spacing:0;border-collapse:collapse;font-family:proxima-nova,'helvetica neue',helvetica,arial,geneva,sans-serif;height:100%;width:100%;border-top-style:solid;border-top-color:#ebeaef;color:#999999;font-size:12px;background:#ffffff;margin:0;padding:0;border-width:1px 0 0">
                                <tbody>
                                    <tr style="vertical-align:top;padding:0">
                                        <td valign="top" style="vertical-align:top;text-align:left;padding:0" align="left">
                                            <p style="margin:20px 0">
                                                <b>${appName} is the base <b>mean</b> for rapid deployment of web applications.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
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