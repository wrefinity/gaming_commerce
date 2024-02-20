"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    status;
    isOperational;
    constructor(message, statusCode = 500) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CustomError;
//# sourceMappingURL=customError.js.map