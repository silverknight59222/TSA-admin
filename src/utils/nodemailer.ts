import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
console.log(email, pass);
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass
  }
});
