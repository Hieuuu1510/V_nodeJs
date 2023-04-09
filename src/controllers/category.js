import Joi from "joi";
import category from "../models/category";

const Schema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  __v : Joi.number()
});

const getAllCategory = async (req, res) => {
  try {
    const categories = await category.find();
    if (!categories) {
      return res.status(404).json({
        message: "không có danh mục",
      });
    }
    return res.json({
      message: "lấy danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const categories = await category.findById(req.params.id).populate("products");

    if (!categories) {
      return res.status(404).json({
        message: "không tìm thấy danh mục này",
      });
    }

    return res.json({
      message: "lấy 1 danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    const categories = await category.findByIdAndDelete(req.params.id);
    if (!categories) {
      return res.status(404).json({
        message: "không tìm thấy sản phẩm cần xoá",
      });
    }
    return res.json({
      message: "Xoá danh mục thành công",
      categories,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(404).json({
        message: error.details[0].message,
      });
    }

    const categories = await category.create(req.body);
    if(!categories) {
        return res.status(404).json({
            message: "Thêm sản phẩm không thành công"
        })
    }
    return res.json({
        message:"Thêm sản phẩm thành công",
        categories
    })
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateCategory = async( req, res) => {
    try {
        const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(404).json({
        message: error.details[0].message,
      });
    }

    const categories = await category.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true});
    if(!categories) {
        return res.status(404).json({
            message: "update sản phẩm thất bại"
        })
    }
    return res.json({
        message: "update sản phẩm thành công",
        categories
    })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


export { getAllCategory, getOneCategory, removeCategory, createCategory, updateCategory}