import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: unknown) {
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error retrieving projects: ${error.message}` });
    } else {
      // Handle other types of errors (in case it's not an Error object)
      res
        .status(500)
        .json({
          message: "An unknown error occurred while retrieving projects",
        });
    }
  }
}

async function createProject(req: Request, res: Response): Promise<void> {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: unknown) {
    // Check if the error is an instance of the Error object
    if (error instanceof Error) {
        res.status(500).json({ message: `Error creating project: ${error.message}` });
    } else {
        // Handle other types of errors (in case it's not an Error object)
        res.status(500).json({ message: "An unknown error occurred while retrieving projects" });
    }
}
}
export default {
  getProjects,
  createProject,
};
