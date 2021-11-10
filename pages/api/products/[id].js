import nc from "next-connect";
import {singleProduct, deleteProduct, updateProduct} from "../../../backend/controllers/productControllers";
import connectDB from "../../../backend/db/db";
import onError from "../../../backend/middlewares/errors";

const handler = nc({onError});

connectDB()

handler.get(singleProduct).delete(deleteProduct).put(updateProduct);

export default handler;