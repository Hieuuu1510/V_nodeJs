import Joi from "joi";

const SchemaSignup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.email": "email không đúng định dạng",
    "string.empty": "email khônd được để trống",
    "any.required": "trường email bắt buộc nhập",
  }),
  password: Joi.string().min(5).required().messages({
    "string.min": "mật khẩu ít nhất {#limit} ký tự",
    "string.empty": "mật khẩu không được để trống",
    "any.required": "trường pass bắt buộc nhập",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password không khớp",
    "any.required": "confirmPassword bắt buộc phải nhập",
  }),
});

const SchemaSignin = Joi.object({
  email: Joi.string().required().email().messages({
    "string.email": "Email không đúng định dạng",
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
  }),
  password: Joi.string().required().min(5).messages({
    "string.min": "Pass bắt buộc phải có {#limit} ký tự",
    "string.emtpy": "Pass không được để trống",
    "any.required": "Pass bắt buộc nhập",
  }),
});

export { SchemaSignup, SchemaSignin };
