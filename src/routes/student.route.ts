import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
} from '../controllers/student.controller';
import { createStudentValidation } from '../utils/validations';
import { validateRequest } from '../middlewares/requestValidator';
import upload from '../middlewares/upload';

const router = Router();

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student profile
 *     description: This endpoint creates a new student profile with a base64 encoded profile photo.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - enrollmentStatus
 *               - profilePhoto
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the student
 *                 example: Michael Kalango
 *               email:
 *                 type: string
 *                 description: Student's email address
 *                 example: michael.kalango@example.com
 *               enrollmentStatus:
 *                 type: string
 *                 description: Enrollment status of the student
 *                 example: Enrolled
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *                 description: Profile photo file to be uploaded
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the student
 *                       example: 60d21b4667d0d8992e610c85
 *                     fullName:
 *                       type: string
 *                       description: Full name of the student
 *                       example: Michael Kalango
 *                     email:
 *                       type: string
 *                       description: Email of the student
 *                       example: michael.kalango@example.com
 *                     enrollmentStatus:
 *                       type: string
 *                       description: Enrollment status
 *                       example: Enrolled
 *                     profilePhoto:
 *                       type: string
 *                       description: Base64 encoded profile photo of the student
 *                       example: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAA..."
 *       400:
 *         description: Bad request. Profile photo is required or validation failed.
 *       422:
 *         description: Unprocessable entity. Student with this email already exists.
 */
router.post(
  '/new-student',
  upload.single('profilePhoto'),
  createStudentValidation,
  validateRequest,
  createStudent
);

router.get('/all', getAllStudents);

router.delete('/:studentId', deleteStudent);

export default router;
