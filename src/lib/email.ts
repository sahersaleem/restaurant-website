
import nodemailer from 'nodemailer'

export async function sendConfirmationEmail(email: string , resetLink :string) {
  console.log(email);
  console.log(resetLink);
  
  
      const transporter = nodemailer.createTransport({
        service: "gmail", // Using Gmail service for email sending
        auth: {
          user: "saleemsaba281@gmail.com", // Your Gmail address
          pass: "wjcxbtvhdpyidgdo", // Your Gmail password or app password
        },
      });

      const mailOptions = {
        from: "saleemsaba281@gmail.com",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email send successfully")
       
      } catch (error:any) {
        console.log('Error occur while sending resest link email');
        
        
      }
    }