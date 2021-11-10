import nc from "next-connect";
import connectDB from "../../../../backend/db/db";
import onError from "../../../../backend/middlewares/errors";
import {login} from "../../../../backend/controllers/userControllers";

const handler = nc({onError});

connectDB()

handler.post(login);

export default handler;