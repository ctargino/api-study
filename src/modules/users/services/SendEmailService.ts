import nodemailer from 'nodemailer';
import SMTP_CONFIG from '@shared/config/smtp';

interface IMailSent {
  from: string;
  to: string | undefined;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: false,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

class SendEmailService {
  public async execute({
    subject,
    from,
    to,
    html,
  }: IMailSent): Promise<Response> {
    const mailSent = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html,
    });
    return mailSent;
  }
}

export default SendEmailService;
