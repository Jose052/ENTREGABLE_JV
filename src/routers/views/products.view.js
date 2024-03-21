import CustomRouter from '../CustomRouter.js'

import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import isAdminMid from "../../middlewares/isAdmin.mid.js";

export default class ProductsViewsRouter extends CustomRouter {
  init() {
    this.read("/real", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("real", {
          title: "REAL",
        });
      } catch (error) {
        next(error);
      }
    });

    this.read("/form", ["ADMIN"], (req, res, next) => {
      try {
        return res.render("form", {
          title: "newProduct",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
