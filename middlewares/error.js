export const errorHandler = (error, req, res, next) => {
    const stack = error?.stack;
    const statusCode = error?.statusCode ? error?.statusCode : 500;
    const message = error?.message;
    res.status(statusCode).json({
        stack,
        message,
    })
}

export const routeNotFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
}