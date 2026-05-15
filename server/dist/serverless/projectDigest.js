"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectDigest = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const projectDigest = async (_req, res) => {
    const [total, active] = await Promise.all([
        Project_1.default.countDocuments(),
        Project_1.default.countDocuments({
            status: "Active"
        })
    ]);
    res.json({
        total,
        active,
        generatedAt: new Date().toISOString()
    });
};
exports.projectDigest = projectDigest;
