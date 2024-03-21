import User from "./models/users.model.js";
import Product from "./models/products.model.js";
import Order from "./models/orders.model.js";

import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read(filter, sortAndPaginate) {
    try {
      sortAndPaginate = { ...sortAndPaginate, lean: true };
      const all = await this.model.paginate(filter, sortAndPaginate);
      if (all.totalDocs === 0) {
        const error = new Error("No hay datos!!!");
        error.statusCode = 404;
        throw error;
      }
      return all["docs"];
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async ordersByUser(uid) {
    try {
      const orders = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "product_id",
          },
        },
        {
          $project: {
            _id: false,
            idOrder: "$_id",
            product_photo: "$product_id.photo",
            product_price: "$product_id.price",
            quantity: "$quantity",
            state: "$state",
            orderdate: "$createdAt",
            currency: "USD",
          },
        },
      ]);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { uid: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "pid",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: false,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const Products = new MongoManager(Product);
const Users = new MongoManager(User);
const Orders = new MongoManager(Order);

export { Products, Users, Orders };
