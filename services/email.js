import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to,
        subject,
        text,
    });

    return "Email sent successfully!";
};