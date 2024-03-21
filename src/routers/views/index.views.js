import CustomRouter from "../CustomRouter.js";

import { Products as PM } from "../../data/mongo/manager.mongo.js";

import ProductsViewsRouter from "./products.view.js";
import UserViewsRouter from "./users.views.js";
import AuthViewsRouter from "./auth.views.js";
import OrdersViewsRouter from "./orders.views.js";


const pview = new ProductsViewsRouter();
const productsRouter = pview.getRouter();
const oview = new OrdersViewsRouter();
const ordersRouter = oview.getRouter();
const uview = new UserViewsRouter();
const usersRouter = uview.getRouter();
const aview = new AuthViewsRouter();
const authRouter = aview.getRouter();



export default class IndexViewsRouter extends CustomRouter{
  init(){
    this.use("", productsRouter);
    this.use("", usersRouter);
    this.use("", ordersRouter)
    this.use("", authRouter);

    this.read("/", ["PUBLIC"], async(req, res, next) => {
      try {
        const Products = await PM.read();
        return res.render("index", { Products : Products , title: "HOME" });
      } catch (error) {
        next(error);
      }
    });
  }
};
