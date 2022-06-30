import {errorHandler, jwtMiddleware} from "helpers/api";

const apiHandler = (handler) => {
    return async (req, res) => {
        try {
            // global middleware
            await jwtMiddleware(req, res);

            // route handler
            await handler(req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}