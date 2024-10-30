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
function getProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projects = yield prisma.project.findMany();
            res.status(200).json(projects);
        }
        catch (error) {
            // Check if the error is an instance of the Error object
            if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: `Error retrieving projects: ${error.message}` });
            }
            else {
                // Handle other types of errors (in case it's not an Error object)
                res.status(500).json({
                    message: "An unknown error occurred while retrieving projects",
                });
            }
        }
    });
}
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description, startDate, endDate } = req.body;
        try {
            const newProject = yield prisma.project.create({
                data: {
                    name,
                    description,
                    startDate,
                    endDate,
                },
            });
            res.status(201).json(newProject);
        }
        catch (error) {
            // Check if the error is an instance of the Error object
            if (error instanceof Error) {
                res
                    .status(500)
                    .json({ message: `Error creating project: ${error.message}` });
            }
            else {
                // Handle other types of errors (in case it's not an Error object)
                res
                    .status(500)
                    .json({
                    message: "An unknown error occurred while retrieving projects",
                });
            }
        }
    });
}
exports.default = {
    getProjects,
    createProject,
};
