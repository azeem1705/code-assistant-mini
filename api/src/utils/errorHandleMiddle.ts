import { Request, Response } from "express";
import { ErrorResponse } from "./response";

class HttpError extends Error {
    constructor(public statusCode: number, public message: string) {
      super(message);
    }
}

export function handleError(err: Error, req: Request, res: Response) {
    console.error(err.stack); // Log the error for debugging
  
    // Customize the response based on the error type and severity:
    if (err instanceof HttpError) { // Handle known HTTP errors (e.g., 400, 403, 404)
        const errorResponse = ErrorResponse(err.statusCode, err.message);
        res.status(err.statusCode).send(errorResponse); // Or your desired response payload
    }
        //  else if (process.env.NODE_ENV === 'production') { // Handle unexpected errors in production
    //     const errorResponse = ErrorResponse(500, 'Internal Server Error');
    //     res.status(500).send(errorResponse); // Generic message
    // } 
    else { // Handle unexpected errors in development (more details for debugging)
        const errorResponse = ErrorResponse(500, `Internal Server Error  ${err.message?err.message:''}`);
        res.status(500).send(errorResponse); // Include error message
    }
}