import mongoose, { Document, Schema } from 'mongoose';
import { EnrollmentStatus } from '../utils/validatorEnum';
import { DateUtil } from '../utils/dateUtil';

export interface StudentDocument extends Document {
  fullName: string;
  email: string;
  enrollmentStatus: EnrollmentStatus;
  profilePhoto: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentSchema = new Schema<StudentDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    enrollmentStatus: {
      type: String,
      enum: Object.values(EnrollmentStatus),
      default: EnrollmentStatus.ENROLLED,
    },
  },
  {
    timestamps: true,
  }
);

StudentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = DateUtil.getCurrentDate();
  }
  this.updatedAt = DateUtil.getCurrentDate();
  next();
});

export const Student = mongoose.model<StudentDocument>(
  'Student',
  StudentSchema
);
