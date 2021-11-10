import nc from "next-connect";
import onError from "../../../backend/middlewares/errors";
import connectDB from "../../../backend/db/db";
import {getUserProfile} from "../../../backend/controllers/userControllers";
import {authorize, protect} from "../../../backend/middlewares/auth";

const handler = nc({onError});

connectDB();

handler.use(protect, authorize("user", "admin")).get(getUserProfile);

export default handler;