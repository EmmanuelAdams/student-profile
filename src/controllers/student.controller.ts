import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async';
import ErrorResponse from '../utils/errorResponse';
import { statusCode } from '../utils/statusCodes';
import studentService from '../services/student.service';
import { Student } from '../models/Student';

export const createStudent = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { fullName, email, enrollmentStatus } = req.body;
    const profilePhoto = req.file;

    if (!profilePhoto) {
      throw new ErrorResponse(
        'Profile photo is required',
        statusCode.badRequest
      );
    }

    try {
      const newStudent = await studentService.createStudent(
        fullName,
        email,
        enrollmentStatus,
        profilePhoto
      );

      return res.status(statusCode.created).json({
        success: true,
        data: newStudent,
      });
    } catch (error: any) {
      next(
        new ErrorResponse(
          error.message,
          statusCode.unprocessable
        )
      );
    }
  }
);

export const getAllStudents = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const totalStudents = await Student.countDocuments();

      const students = await Student.find()
        .sort({ createdAt: -1 })
        .limit(parseInt(limit as string))
        .skip(
          (parseInt(page as string) - 1) *
            parseInt(limit as string)
        );

      res.status(statusCode.success).json({
        success: true,
        total: totalStudents,
        count: students.length,
        currentPage: page,
        totalPages: Math.ceil(
          totalStudents / parseInt(limit as string)
        ),
        students,
      });
    } catch (error: any) {
      next(
        new ErrorResponse(
          error.message,
          statusCode.unprocessable
        )
      );
    }
  }
);

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.deleteStudent(
      studentId
    );
    res.status(statusCode.success).json(result);
  } catch (error: any) {
    next(
      new ErrorResponse(
        error.message,
        statusCode.unprocessable
      )
    );
  }
};
