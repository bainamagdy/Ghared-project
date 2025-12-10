class AppError extends Error {
    constructor(message, statusCode, statusText) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const create = (message, statusCode, statusText) => {
    return new AppError(message, statusCode, statusText);
};

export default { create };
