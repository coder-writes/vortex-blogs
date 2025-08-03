import Newsletter from "../models/Newsletter.js";
import nodemailer from "nodemailer";
import 'dotenv/config';



const transporter = nodemailer.createTransport({
    host: 	'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    authMethod: 'LOGIN',
}); 

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Newsletter Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #4f46e5; padding: 30px;">
              <img src="https://plus.unsplash.com/premium_photo-1682310468892-5d8ade38f606?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5ld3NsZXR0ZXJ8ZW58MHx8MHx8fDA%3D" alt="Newsletter Image" width="80" style="display: block; border-radius: 10px; margin-bottom: 15px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">You're Subscribed!</h1>
              <p style="color: #d1d5db; margin-top: 8px;">Welcome to the Vortex community</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333333;">Hi there,</p>
              <p style="font-size: 16px; color: #333333; line-height: 1.5;">
                Thank you for subscribing to our newsletter. You'll now receive the latest updates, project insights, and tech articles delivered directly to your inbox.
              </p>
              <p style="font-size: 16px; color: #333333; margin-top: 20px;">
                Curious to see what I'm working on?
                <br />
                👉 <a href="https://risshi.me" style="color: #4f46e5; text-decoration: none;">Check out my portfolio</a>
              </p>
              <p style="font-size: 16px; color: #333333; margin-top: 20px;">Stay connected!</p>
              <p style="font-size: 16px; font-weight: bold; color: #4f46e5;">— Team Vortex</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; background-color: #f0f0f0;">
              <p style="font-size: 12px; color: #888888; margin: 0;">
                © 2025 Vortex. All rights reserved. | <a href="https://risshi.me" style="color: #4f46e5; text-decoration: none;">Visit Portfolio</a>
              </p>
              <table cellpadding="0" cellspacing="0" style="margin-top: 10px;">
                <tr>
                  <td>
                    <a href="https://github.com/coder-writes" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" width="24" height="24" alt="GitHub" /></a>
                  </td>
                  <td>
                    <a href="https://linkedin.com/in/rishi-verma-sde" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" width="24" height="24" alt="LinkedIn" /></a>
                  </td>
                  <td>
                    <a href="mailto:vortex@risshi.me" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="24" height="24" alt="Email" /></a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


export const sendConfirmationEmail = async (req,res) => {
    if (!req.body.email) {
        return res.status(400).json({success: false, message: "Email is required!" });
    }
    const {email} = req.body;
    
    try{
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({success:true ,  message: "You have already Subscribed our newsletter with the provided email!" });
        }
        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Newsletter Subscription Confirmation',
            html: htmlContent,
        };
        await transporter.verify(function(error, success) {
            if (error) {
                res.status(500).json({success: false, message: "Failed to send confirmation email but you are still subscribed." });
                // console.log("Error verifying transporter:", error);
            }
            else {
                console.log("Server is ready to take our messages");
            }
        });
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true, message: "You Have Subscribed to the Newsletter SuccessFully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({success: false, message: "Failed to send confirmation email." });
    }
}




