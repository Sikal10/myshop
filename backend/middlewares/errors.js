import ErrorResponse from "../helpers/errorHandler";

const onError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    console.log(err);

    let error = {...err}
    error.message = err.message
    console.log(err.stack.red);

    //Wrong mongoose object ID error
    if (err.name === "CastError") {
        const message = `Product not found with the ID ${err.value}`;
        error = new ErrorResponse(message, 400);
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
        const message = ``
    }


    //Validation Error

    res.status(err.statusCode || 500).json({success:false, error, message: error.message || "Server Error", stack: error.stack});

}

export default onError;