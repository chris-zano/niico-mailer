import VerificationCodeModel from "../../models/verifications_codes.model.js";
import { sendMail } from "../../utils/mailer/mail.worker.util.js";
import { generateEmailVerificationTemplate } from "../../utils/mailer/templates.util.js";



export const verifyCodeWithEmailAndCode = async (request, response) => {

    try {
        if (!request.body.email || !request.body.code) {
            return response.status(400).json({ message: 'email and code are required' });
        }

        const { code, email } = request.body;
        const verification_code = await VerificationCodeModel.findOne({ code, email });
        if (!verification_code) return response.status(400).json({ message: 'Invalid code' });

        return response.status(200).json(
            {
                message: 'Code verified successfully',
                user: {
                    email: email,
                }
            });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal server error' });
    }
}

export const sendVerificationCodeToEmail = async (request, response) => {
    try {
        if (!request.body.email) {
            return response.status(400).json({ message: 'Email is required' });
        }

        const { email } = request.body;
        
        const { code, template } = generateEmailVerificationTemplate();

        const new_code = new VerificationCodeModel({ code, email });
        await new_code.save();

        sendMail({ to: email, subject: 'Email Verification', html: template });

        setTimeout(async () => {
            await VerificationCodeModel.deleteOne({ email, code });
            console.log(`Verification code for ${email} deleted after 15 minutes.`);
        }, 900000);

        return response.status(200).json({ message: 'Email has been confirmed successfully' });

    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Internal server error' });
    }
};
