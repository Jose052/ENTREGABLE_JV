import CustomRouter from '../CustomRouter.js'

export default class UserViewsRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("register", {
          title: "REGISTER",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
