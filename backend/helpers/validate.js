import bcrypt from "bcryptjs";

export const validateUserData = (name, email, password, res) => {
    if (!name || !email || !password) {
        return res.status(400).json({message: "Please enter all required fields."});
    }
}

export const comparePassword = async (password, user) => {
    return await bcrypt.compare(password, user.password);
}

export const hashPasswordHandler =  async (password) => {
    return await bcrypt.hash(password, 12);
}