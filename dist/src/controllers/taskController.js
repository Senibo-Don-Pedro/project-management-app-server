"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectId } = req.query;
        try {
            const tasks = yield prisma.task.findMany({
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
        }
        catch (error) {
            // Check if the error is an instance of the Error object
            if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: `Error retrieving tasks: ${error.message}` });
            }
            else {
                // Handle other types of errors (in case it's not an Error object)
                res.status(500).json({
                    message: "An unknown error occurred while retrieving tasks",
                });
            }
        }
    });
}
function updateTaskStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { taskId } = req.params;
        const { status } = req.body;
        try {
            const updatedTask = yield prisma.task.update({
                where: {
                    id: Number(taskId),
                },
                data: {
                    status
                }
            });
            res.status(200).json(updatedTask);
        }
        catch (error) {
            // Check if the error is an instance of the Error object
            if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: `Error updating tasks: ${error.message}` });
            }
            else {
                // Handle other types of errors (in case it's not an Error object)
                res.status(500).json({
                    message: "An unknown error occurred while updating tasks",
                });
            }
        }
    });
}
function createTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
        try {
            const newTask = yield prisma.task.create({
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
        }
        catch (error) {
            // Check if the error is an instance of the Error object
            if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: `Error creating task: ${error.message}` });
            }
            else {
                // Handle other types of errors (in case it's not an Error object)
                res.status(500).json({
                    message: "An unknown error occurred while creating a task",
                });
            }
        }
    });
}
exports.default = {
    getTasks,
    createTask,
    updateTaskStatus
};
