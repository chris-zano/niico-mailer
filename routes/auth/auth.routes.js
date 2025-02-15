import { Router } from 'express';
import { verifyCodeWithEmailAndCode, sendVerificationCodeToEmail } from '../../controllers/auth/signup.controller.js';


const router = Router();

router.post('/auth/verify-code', verifyCodeWithEmailAndCode);
router.post('/auth/send-code', sendVerificationCodeToEmail);

export default router;