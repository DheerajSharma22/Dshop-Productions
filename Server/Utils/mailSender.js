const nodemailer = require("nodemailer");


const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        const info = await transporter.sendMail({
            from: "Study Notion",
            to: email,
            subject: title,
            html: body,
        })

        return info;
    } catch (error) {
        console.log("error in mailSender ->", error.message);
    }
}

module.exports = mailSender;