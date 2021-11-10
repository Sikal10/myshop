import nc from "next-connect";
import connectDB from "../../../../backend/db/db";
import onError from "../../../../backend/middlewares/errors";
import {registerUser} from "../../../../backend/controllers/userControllers";

const handler = nc({onError});

connectDB()

handler.post(registerUser);

export default handler;