import User from "../models/auth";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { SchemaSignin, SchemaSignup } from "../../Schema/auth";

dotenv.config();
const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = SchemaSignup.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(404).json({
        message: errors,
      });
    }

    // kiểm tra email có tồn tại không
    const userExit = await User.findOne({ email });
    if (userExit) {
      res.status(404).json({
        message: "Email đã tồn tại",
      });
    }
    // mã hoá mật khẩu
    const handerPassword = await bcrypt.hash(password, 10);
    // req gửi lên server
    const user = await User.create({
      name,
      email,
      password: handerPassword,
    });
    user.password = undefined;

    const token = Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    res.json({
      message: "Đăng ký thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = SchemaSignin.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(404).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }

    // mã hoá mật khẩu
    const isMatcht = await bcrypt.compare(password, user.password);
    if (!isMatcht) {
      res.status(404).json({
        message: "Sai mật khẩu rồi",
      });
    }
    // tạo 1 token từ server
    user.password = undefined;
    const token = Jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    return res.json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export { signup, signin };
