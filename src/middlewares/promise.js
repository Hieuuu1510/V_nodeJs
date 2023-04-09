import Jwt from "jsonwebtoken";
import dotenv from "dotenv"
import User from "../models/auth";
dotenv.config();


export const promise = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            res.status(404).json({
                message: "no authorization"
            })
        }

        const token = req.headers.authorization.split(" ")[1];

        const { _id} = Jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(_id);
        if(!user) {
            res.status(404).json({
                message: "tài khoản không tồn tại"
            })
        }
        if(user.role !== "admin") {
            return res.status(404).json({
                message: "bạn không có quyền"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}