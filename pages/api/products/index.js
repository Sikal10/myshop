import nc from "next-connect";
import {allProducts, newProduct} from "../../../backend/controllers/productControllers";
import connectDB from "../../../backend/db/db";
import onError from "../../../backend/middlewares/errors";

const handler = nc({onError});

connectDB()

handler.get(allProducts).post(newProduct);

export default handler;