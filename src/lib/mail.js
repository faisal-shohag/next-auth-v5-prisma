import * as nodemailer from 'nodemailer'
import { activationTemplate } from './emailTemplate/activationTemplate';
import Handlebars from "handlebars";


export async function sendMail({to, subject, body}) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        
        },
    });

    try {
        const result = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: body,
        });
        console.log("Email sent: ",result)
    } catch (error) {
        console.log("EMAIL ERROR", error)
    }

}


export function compileActivationTemplate(name, url) {
    const template = Handlebars.compile(activationTemplate);

    return template({ name, url });
}