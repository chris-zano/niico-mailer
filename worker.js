import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { sendMail } from './utils/mailer/mail.worker.util.js';

// HTML template function (basic)
const generateEmailHTML = (name, optInLink) => `
  <p>Dear ${name},</p>
  <p>We’re excited to invite you to become one of our <strong>early testers</strong> for the <strong>Logos-Zoé</strong> mobile app — a product of <em>The Noah’s Project</em>...</p>
  <p>
    <a href="${optInLink}" target="_blank">Click here to join the testing program</a>
  </p>
  <p>Thank you and God bless you!<br />— The Logos-Zoé Development Team</p>
`;

const subject = "You're Invited to Test the Logos-Zoé App (Early Access)";
const optInLink = 'https://play.google.com/apps/internaltest/4701695449362655293';

const csvPath = path.resolve('emails.csv');

fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', async (row) => {
    const { name, email } = row;
    const html = generateEmailHTML(name, optInLink);

    try {
      const result = await sendMail({ to: email, subject, html });
      if (result) {
        console.log(`✅ Email sent to ${email}`);
      } else {
        console.log(`❌ Failed to send email to ${email}`);
      }
    } catch (error) {
      console.error(`🚨 Error processing ${email}:`, error);
    }
  })
  .on('end', () => {
    console.log('📬 All emails processed.');
  });
