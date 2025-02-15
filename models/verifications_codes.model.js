
import mongoose, { Schema } from 'mongoose';

const verificationCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerificationCodeModel = mongoose.model('VerificationCodeModel', verificationCodeSchema);
export default VerificationCodeModel;