"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    const message = err.message || "Error occurred";
    return (0, sendResponse_1.default)(res, {
        statusCode,
        success: false,
        message,
        data: null,
        stack: err,
    });
};
exports.default = globalErrorHandler;
