class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
export const rateLimiter = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};
export const tryCatchError = (error: unknown, text: string) => {
  if (error instanceof Error) {
    console.error(`Error while ${text}:`, error.message);
    console.error(error.stack);

    if (error.name === "ValidationError") {
      // Handle Mongoose validation errors
      return {
        message: `Validation failed while ${text}. Check the input data.`,
        status: 400,
        success: false,
      };
    } else if (error.name === "MongoError" && (error as any).code === 11000) {
      // Handle duplicate key errors (e.g., unique constraint violations)
      return {
        message: `Duplicate key error while ${text}. Ensure unique constraints are met.`,
        status: 409,
        success: false,
      };
    } else if (error.name === "CastError") {
      // Handle casting errors, such as invalid ObjectId in Mongoose
      return {
        message: `Invalid ID format provided while ${text}.`,
        status: 400,
        success: false,
      };
    } else if (
      error.name === "NetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      // Handle network or database connection errors
      return {
        message: `Database connection issue occurred while ${text}. Please try again later.`,
        status: 503,
        success: false,
      };
    }

    // General error response for other known Error instances
    return {
      message: `An error occurred while ${text}: ${error.message}`,
      status: 500,
      success: false,
    };
  } else {
    // Handle non-Error objects (unexpected error formats)
    console.error(`An unknown error occurred while ${text}:`, error);
    return {
      message: `An unexpected error occurred while ${text}.`,
      status: 500,
      success: false,
    };
  }
};
