import express from "express";
import { signup, signin } from "../controllers/auth";


const routerAuth = express.Router();


routerAuth.post("/signup", signup)
routerAuth.post("/signin", signin)


export default routerAuth;