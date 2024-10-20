"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../controllers/taskController"));
const router = (0, express_1.Router)();
router.get("/", taskController_1.default.getTasks);
router.post("/", taskController_1.default.createTask);
router.patch("/:taskId/status", taskController_1.default.updateTaskStatus);
exports.default = router;
