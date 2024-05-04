import nodemailer from 'nodemailer'
import generateOTP from './otpService'
require('dotenv').config()


const auth_email = process.env.auth_email
const auth_password = process.env.auth_pass



const transporter = nodemailer.createTransport({

    service: 'Gmail',
    auth: {
        user: auth_email,
        pass: auth_password,
    },
})

//test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log((error as Error).message);
    } else {
        console.log("Mail Server Initialized : " + success)
    }
});


//=======send email============
export const sendEmail = async (email: string, mailSubject: string, message: string) => {
    const mailOptions = {
        from: auth_email,
        to: email,
        subject: mailSubject,
        html: message,
    }
    const sendEmail = await transporter.sendMail(mailOptions);
    if (sendEmail) {
        return {
            status: 200,
            success: true,
            message: "Email sent successfully"
        }
    } else {
        return {
            status: 400,
            success: false,
            message: "Failed to send email"
        }
    }
}

// Email Verification OTP 

export const verifyEmail = async (email: string ,otp:string) => {
    try {

        const mailSubject = 'Email Verification'
        const message = `<p>Your Email ID : ${email}</p> <p style ="color:tomato; font-size:25px; letter-spacing:2px;"><b> ${otp}</b></p> 
        <p>This code can be used to verify your email in Paint cont.
         The code expire in 15 minutes`

        //send OTP as Email
        const sendOtp = await sendEmail(email, mailSubject, message)
        console.log('emailService', sendOtp)
        return {
            success:true,
            status: sendOtp.status,
            message: sendOtp.message
        }
    } catch (error) {
        return {
            status: 400,
            message: (error as Error).message
        }
    }

}