import { Student } from '../models/Student';
import ErrorResponse from '../utils/errorResponse';
import { statusCode } from '../utils/statusCodes';
import sharp from 'sharp';

export class StudentService {
  async createStudent(
    fullName: string,
    email: string,
    enrollmentStatus: string,
    profilePhoto: Express.Multer.File
  ) {
    const existingStudent = await Student.findOne({
      email,
    });
    if (existingStudent) {
      throw new ErrorResponse(
        'Student with this email already exists',
        statusCode.badRequest
      );
    }

    // Compress and convert profile photo to Base64
    const base64Image = await this.processProfilePhoto(
      profilePhoto
    );

    const newStudent = new Student({
      email,
      fullName,
      profilePhoto: base64Image, // Store the compressed Base64 image
      enrollmentStatus,
    });

    await newStudent.save();
    return newStudent;
  }

  async deleteStudent(studentId: string) {
    const studentToDelete = await Student.findById(
      studentId
    );

    if (!studentToDelete) {
      throw new ErrorResponse(
        'Student not found or already deleted',
        statusCode.notFound
      );
    }

    await Student.deleteOne({ _id: studentId });

    return {
      success: true,
      message: 'Student deleted successfully',
    };
  }

  private async processProfilePhoto(
    profilePhoto: Express.Multer.File
  ): Promise<string> {
    try {
      const compressedBuffer = await sharp(
        profilePhoto.buffer
      )
        .resize(300, 300)
        .jpeg({ quality: 70 })
        .toBuffer();

      const base64Image =
        compressedBuffer.toString('base64');
      return `data:${profilePhoto.mimetype};base64,${base64Image}`;
    } catch (error) {
      throw new ErrorResponse(
        'Failed to process profile photo',
        statusCode.unprocessable
      );
    }
  }
}

export default new StudentService();
