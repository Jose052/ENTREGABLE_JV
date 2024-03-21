import CustomRouter from '../CustomRouter.js'

export default class OrdersViewsRouter extends CustomRouter {
  init() {
    this.read("/orders", (req, res, next) => {
      try {
        return res.render("orders", {
          title: "ORDERS",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
