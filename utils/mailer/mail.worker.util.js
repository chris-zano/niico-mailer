import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendMail = ({ to, subject, html }) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, './mailer.util.js'));

        worker.on('message', (result) => {
            if (result.success) {
                console.log('Email sent successfully:', result.response);
                resolve(true);
            } else {
                console.error('Error sending email:', result.error);
                resolve(false);
            }
        });

        worker.on('error', (error) => {
            console.error('Worker encountered an error:', error);
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });

        worker.postMessage({ to, subject, html });
    });
};
