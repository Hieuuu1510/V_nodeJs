import dotenv from "dotenv";
import axios from "axios";
import Joi from "joi";
import product from "../models/product";
import category from "../models/category";
dotenv.config();

const sChame = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  __v: Joi.number(),
  categoryId: Joi.string().required(),
});

export const getall = async (req, res) => {
  const { _limit = 10, _sort = "createAt", _order = "asc" } = req.query;

  const options = {
    customLabels: {
      docs: "data",
    },
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };

  try {
    // const { data: product } = await axios.get(
    //   `${process.env.API_URL}/products`
    // );

    const products = await product.paginate({}, options);

    if (products.length === 0) {
      return res.status(404).json({
        message: "không có sản phẩm nào",
      });
    }
    res.json({
      message: "Lấy sản phẩm thành công",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    // const { data: product } = await axios.get(
    //   `${process.env.API_URL}/products/${req.params.id}`
    // );

    const products = await product
      .findById(req.params.id)
      .populate("categoryId");

    if (!products) {
      return res.status(404).json({
        message: "khong tim thay san pham",
      });
    }
    res.json({
      message: "detail san pham thanh cong",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "list detail san pham that bai",
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = sChame.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // const { data: product } = await axios.post(
    //   `${process.env.API_URL}/products`,req.body
    // );

    const productt = await product.create(req.body);
    await category.findByIdAndUpdate(productt.categoryId, {
      $addToSet: { products: productt._id },
    });
    if (!productt) {
      return res.status(404).json({
        message: "them san pham khong thanh cong",
      });
    }
    return res.json({
      message: "Them san pham thanh cong",
      productt,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    // const { data: product } = await axios.delete(
    //   `${process.env.API_URL}/products/${req.params.id}`
    // );

    const products = await product.findByIdAndRemove(req.params.id);
    console.log(product);
    console.log(req.params.id);
    if (products.length == 0) {
      return res.status(404).json({
        message: "khong tim thay san pham can xoa",
      });
    }
    res.json({
      message: "Xoa san pham thanh cong",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const put = async (req, res) => {
  try {
    const { error } = sChame.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // const { data: product } = await axios.put(
    //   `${process.env.API_URL}/products/${req.params.id}`,
    //   req.body
    // );
    const productId = req.params.id;
    const products = await product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );

    if (!products) {
      return res.status(404).json({
        message: "khong tim thay san pham can update",
      });
    }
    console.log(products);
    //Xoá sản phẩm khỏi danh mục cũ
    const oldCategoryId = products.categoryId
    await category.findByIdAndUpdate(oldCategoryId,
      {
        $pull: {products: productId}
      })
      // thêm sản phẩm vào danh mục mới
      const newCategoryId = req.body.categoryId;
      if(newCategoryId) {
        await category.findByIdAndUpdate(newCategoryId,{
          $addToSet: {
            products: productId
          }
        })
      }
    res.json({
      message: "update san pham thanh cong",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "update san pham that bai",
    });
  }
};
