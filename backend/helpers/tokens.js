import jwt from "jsonwebtoken";

export const signAccessToken = async (userId) => {
    return await jwt.sign({id: userId}, process.env.ACTIVATION_TOKEN_KEY, {expiresIn: process.env.ACTIVATION_TOKEN_EXPIRY});
}

export const verifyAccessToken = async (accessToken) => {
    return jwt.verify(accessToken, process.env.ACTIVATION_TOKEN_KEY);
}