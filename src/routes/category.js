import express from "express";
import { createCategory, getAllCategory, getOneCategory, removeCategory, updateCategory } from "../controllers/category";
import { promise } from "../middlewares/promise.js";


const routerCategory = express.Router();



routerCategory.get(`/categorys`, getAllCategory);
routerCategory.get(`/categorys/:id`, getOneCategory);
routerCategory.post(`/category/add`,promise, createCategory);
routerCategory.delete(`/category/:id`,promise, removeCategory);
routerCategory.put(`/category/:id`,promise, updateCategory);



export default routerCategory


