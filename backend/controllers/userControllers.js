import asyncHandler from "../middlewares/catchAsyncErrors";
import User from "../models/userModel";
import ErrorResponse from "../helpers/errorHandler";
import {comparePassword, hashPasswordHandler, validateUserData} from "../helpers/validate";
import {signAccessToken} from "../helpers/tokens";

export const registerUser = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    validateUserData(name, email, password, res);

    //check if a user with the email already exists.
    const existingUser = await User.findOne({email});
    if (existingUser) return next(new ErrorResponse(`User with the email ${email} already exists.`));

    //hash the password before saving to the db.
    const hashedPassword = await hashPasswordHandler(password);

    const user = await User.create({name, email, password:hashedPassword});
    const token = await signAccessToken(user._id);

    res.status(200).json({success: true, token});
});

export const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) return next(new ErrorResponse("Please provide an email and password.", 400));

    const user = await User.findOne({email}).select("+password");
    if (!user) return next(new ErrorResponse("Invalid credentials.", 401));

    const isPasswordValid = await comparePassword(password, user);

    if (!isPasswordValid) return next(new ErrorResponse("Invalid credentials.", 401));

    const token = await signAccessToken(user._id);
    res.status(200).json({success: true, token});
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({success: true, user});
})