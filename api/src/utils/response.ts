const formatResponse = (statusCode: number, success: boolean, data?: unknown) => {
    return {
          statusCode,
          success,
          data,
    };
  };
  
  
  export const SuccessResponse = (data: object) => {
    return formatResponse(200, true, data);
  };
  
  export const ErrorResponse = (code:number, error: unknown) => {
    let errorMessage;
  
    if (Array.isArray(error)) {
        const errorMessages = error.map((err) => {
            const constraints = err.constraints || {};
            return Object.values(constraints)[0] || 'Error Occurred';
        });
  
        errorMessage = errorMessages.join(', ');
    } else if (typeof error === 'object' && error !== null) {
        const constraints = (error as { constraints?: object }).constraints || {};
        errorMessage = Object.values(constraints)[0] || 'Error Occurred';
    } else if (typeof error === 'string') {
        errorMessage = error;
    }
  
    return formatResponse(code, false,errorMessage);
  };
  
  
  
  
   
   
  