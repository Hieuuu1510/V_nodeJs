// console.log("Trần Minh Hiếu");

// const http = require("http");
// const product = [
//     {
//         id: 1,
//         name: "Trần Minh Hiếu"
//     },
//     {
//         id: 2,
//         name: "Trần Minh "
//     },
//     {
//         id: 3,
//         name: "Trần Hiếu"
//     },
// ]
// const server = http.createServer(function(req, res) {
//     if(req.url === "/") {
//         res.setHeader("Content-Type", "application/json")
//         res.end("Home page")
//         // end: giá trị cuối cùng được trả về
//     }
//     if(req.url === "/products") {
//         res.end(JSON.stringify(product))
//     }
// })
// server.listen(8080, function() {
//     console.log("server nè")
// })

import express from "express";
import routerAuth from "./routes/auth";
import productRouter from "./routes/product";
import mongoose from "mongoose";
import  cors from "cors";
import routerCategory from "./routes/category";
const app = express();
// đăng ký 1 middle ware để giải mã json()
app.use(express.json());
app.use(cors());
app.use(productRouter);
app.use(routerAuth);
app.use(routerCategory);

mongoose.connect("mongodb://localhost:27017/we17302");

export const viteNodeApp = app;
