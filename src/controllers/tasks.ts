import { StatusCodes } from "http-status-codes";
import Note from "../models/tasks";
import { NotFoundError, BadRequestError } from "../errors/index";
import { Request, Response, NextFunction } from "express";

export const getAllTasks = async (req: Request, res: Response) => {
  console.log("user auth verification:", req.userDetail); // Log userDetail
  console.log("Request Headers in getAllTasks:", req.headers); // Log headers

  if (!req.userDetail) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No user found in request" });
  }
  const getAll = await Note.find({ createdBy: req.userDetail }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ getAll, count: getAll.length });
};
// req.params
export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userDetail,
    params: { id: taskId },
  } = req;
  const getTask = await Note.findOne({ _id: taskId, createdBy: userDetail });
  if (!getTask) {
    throw new NotFoundError("task not found");
  }
  res.status(StatusCodes.OK).json({ getTask });
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content || (typeof content === 'string' && content.trim() === '')) {
      throw new BadRequestError('Task content cannot be empty');
    }
    const createdBy = req.userDetail;
    const task = await Note.create({
      content,
      createdBy,
    });
    res.status(StatusCodes.CREATED).json({ task });
    
  } catch (error) {
    console.error(error);
    if (error instanceof BadRequestError) {
      res.status(error.statusCode).json({ msg: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong, please try again later.' });
    }
  }
};

// export const createNewTask = async (req: Request, res: Response) => {
//   try {
//     const { content } = req.body;
//     const createdBy = req.userDetail;
//     const task = await Note.create({
//       content,
//       createdBy,
//     });
//     res.status(StatusCodes.CREATED).json({ task });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Something went wrong, please try again later." });
//   }
// };

export const updateTask = async (req: Request, res: Response) => {
  const { userDetail } = req;
  const { id: taskId } = req.params;
  const { content, completed } = req.body;
  if (!content && typeof completed === "undefined") {
    throw new BadRequestError(
      'Request body must contain either "content" or "completed"'
    );
  }
  if (typeof content === "string" && content.trim() === "") {
    throw new BadRequestError("Content field cannot be an empty string");
  }
  const updateTask = await Note.findByIdAndUpdate(
    { _id: taskId, createdBy: userDetail },
    { content, completed },
    { new: true, runValidators: true }
  );
  if (!updateTask) {
    throw new NotFoundError("no task with id:taskId found");
  }
  res.status(StatusCodes.OK).json({ updateTask });
  // res.send('update task')
};

export const deleteTask = async (req: Request, res: Response) => {
  const {
    userDetail,
    params: { id: taskId },
  } = req;
  const deleteTask = await Note.findByIdAndDelete({
    _id: taskId,
    createdBy: userDetail,
  });
  if (!deleteTask) {
    throw new NotFoundError("no task with id:taskId found");
  }
  res.status(StatusCodes.OK).json({ msg: "task successfully deleted" });
};
