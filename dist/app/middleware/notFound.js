"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req, res, next) => {
    return (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: "API not found",
        data: null,
    });
};
exports.default = notFound;
