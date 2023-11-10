import {
  deleteToken,
  getToken,
  getTokenByToken,
  getUser,
  insertToken,
  updateUserPassword
} from '@/utils/db';
import { transporter } from '@/utils/nodemailer';
import { nanoid } from 'nanoid';
import { hashPassword } from '@/utils/hash';

import { NextApiRequest, NextApiResponse } from 'next/types';
import { InternalError } from '@/utils/errors/api_errors';

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log('**** req', request.body);
  if (request.method === 'POST') {
    const email = request.body;

    try {
      // Check for user existence
      const user = await getUser(email);

      console.log('***** user', user);

      if (!user) {
        response
          .status(404)
          .json({ message: 'Please use the email provided to TSA AI' });
        return;
      }
      const token = await getToken(user.id);

      if (token) {
        deleteToken(token.id)
          .then((res) => {
            console.log('*** deleteToken res', res);
          })
          .catch((error) => {
            console.log('*** deleteToken error', error);
          });
      }

      // Create a token id
      const securedTokenId = nanoid(32);
      console.log(securedTokenId);
      // Store token in DB
      insertToken({
        user_id: user.id,
        token: securedTokenId,
        created_at: Date.now() / 1000
      })
        .then((res) => {
          console.log('**** token insertToken', res);
          if (res) {
            const link = `${process.env.NEXTAUTH_URL}/reset-password/${securedTokenId}`;

            console.log('**** link', link);

            transporter
              .sendMail({
                from: `Phoebe Freedom<${process.env.EMAIL}>`,
                to: user.email,
                subject: 'Reset Password',
                text: 'Reset Password Messsage',
                html: ` 
            <div style="color: #000000;">
              <p style="color: #000000;">Dear ${user.name},</p>
              <p style="color: #000000;">We have received a request to reset your password. To set a new password for your account, please click on the following link:</p>
              <p style="color: #000000;"><a href="${link}">${link}</a></p>
              <p style="color: #000000;">Once you click the link, you will be directed to a page where you can enter and confirm your new password.</p>
              <p style="color: #000000;">If you did not initiate this password reset request or believe this email was sent to you in error, please disregard it.Your account security is important to us.</p>
              <p style="color: #000000;">Should you encounter any issues or require further assistance, please do not hesitate to reply to this email. We will promptly provide the support you need.</p>
              <p style="color: #000000;">Yours in Freedom</p>
              <p style="color: #000000;">Phoebe</p>
            </div>              
            `
              })
              .then((res) => {
                console.log('*** sendMail res', res);
                if (res) {
                  response.status(200).json({ success: true });
                }
              })
              .catch((err) => {
                console.log('*** sendMail error', err);
                throw new InternalError('Please try again.');
              });
            // Link send to user's email for resetting
            // Success
          } else {
            console.log('*** sendMail error');
            throw new InternalError('Please try again.');
          }
        })
        .catch((err) => {
          console.log('**** token remove error', err);
          throw new InternalError('Please try again.');
        });
    } catch (error: any) {
      console.log('**** reset password error', error.message);
      return response.status(400).send({ message: error.message });
    }
  } else if (request.method === 'PUT') {
    const { tokenId, password, userId } = request.body;

    let user_id: string;
    let token;

    if (userId) {
      user_id = userId;
    } else {
      // Get token from DB
      token = await getTokenByToken(tokenId);
      console.log('*** token', token);

      if (!token) {
        return response.status(404).json({
          success: false,
          message: 'Invalid or expired password reset token'
        });
      }
      user_id = token.user_id;
    }

    // Hash password before resetting
    const hashedPassword = await hashPassword(password);
    updateUserPassword(hashedPassword, user_id)
      .then((res) => {
        console.log('**** updateUserPassword', res);
        if (res) {
          if (token) {
            deleteToken(token.id)
              .then((res) => {
                console.log('*** deleteToken', res);
              })
              .catch((err) => {
                console.log('*** deleteToken', err);
              });
          }
          response
            .status(200)
            .json({ seccuess: true, message: 'Password is reset successfuly' });
        } else {
          console.log('*** sendMail error');
          throw new InternalError('Please try again.');
        }
      })
      .catch((err) => {
        console.log('*** updateUserPassword', err);
      });

    // Delete token so it won't be used twice
  } else {
    response.status(400).json({ success: false, message: 'Bad request' });
  }
}
