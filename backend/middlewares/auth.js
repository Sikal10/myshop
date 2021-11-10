import asyncHandler from "./catchAsyncErrors";
import ErrorResponse from "../helpers/errorHandler";
import User from "../models/userModel";
import {verifyAccessToken} from "../helpers/tokens";

export const protect = asyncHandler(async (req, res, next) => {
    let accessToken;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        accessToken = authHeader.split(" ")[1];
    }

    if (!accessToken) return next(new ErrorResponse("Unauthorized access", 401));

    //if the token exists, verify the token;
    try {
        const decodedToken = await verifyAccessToken(accessToken);
        req.user = await User.findById(decodedToken.id);
        next();
    } catch (err) {
        return next(new ErrorResponse("Unauthorized access", 401));
    }

});

export const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route.`, 403));
    }

    next();
}