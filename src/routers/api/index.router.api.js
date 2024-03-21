import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionRouterApi from "./session.router.api.js";


export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionRouterApi);
  }
}
