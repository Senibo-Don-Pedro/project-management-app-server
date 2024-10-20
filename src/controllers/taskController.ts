import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTasks(req: Request, res: Response): Promise<void> {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    res.status(200).json(tasks);
  } catch (error: unknown) {
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error retrieving tasks: ${error.message}` });
    } else {
      // Handle other types of errors (in case it's not an Error object)
      res.status(500).json({
        message: "An unknown error occurred while retrieving tasks",
      });
    }
  }
}

async function updateTaskStatus(req: Request, res: Response): Promise<void> {
  const {taskId} = req.params
  const {status} = req.body


  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status
      }
    });

    res.status(200).json(updatedTask);
  } catch (error: unknown) {
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error updating tasks: ${error.message}` });
    } else {
      // Handle other types of errors (in case it's not an Error object)
      res.status(500).json({
        message: "An unknown error occurred while updating tasks",
      });
    }
  }
}


async function createTask(req: Request, res: Response): Promise<void> {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: unknown) {
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error creating task: ${error.message}` });
    } else {
      // Handle other types of errors (in case it's not an Error object)
      res.status(500).json({
        message: "An unknown error occurred while creating a task",
      });
    }
  }
}

export default {
  getTasks,
  createTask,
  updateTaskStatus
};
