import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  ordersByUser,
  report,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], create);
    this.read("/", ["USER", "PREM"], read);
    this.read("/ordersByUser/:uid", ["USER", "PREM"], ordersByUser);
    this.read("/total/:uid", ["USER", "PREM"], report);
    this.destroy("/:oid", ["USER", "PREM"], destroy);
    this.update("/:oid", ["USER", "PREM"], update);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();