import { body, ValidationChain } from 'express-validator';

export const createStudentValidation: ValidationChain[] = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required'),
  body('email')
    .isEmail()
    .withMessage('A valid email is required'),
  body('enrollmentStatus')
    .notEmpty()
    .withMessage('Enrollment status is required')
    .isIn(['Enrolled', 'Graduated', 'Alumni'])
    .withMessage('Invalid enrollment status'),
];
