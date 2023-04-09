import express from "express";

import { getall, get, create, remove, put} from "../controllers/product.js";
import { promise } from "../middlewares/promise.js";

const router = express.Router();

router.get("/products", getall);
router.get("/products/:id", get);
router.post("/product/add",promise,  create);
router.delete("/product/:id",promise,   remove);
router.put("/product/:id",promise,  put);


export default router;