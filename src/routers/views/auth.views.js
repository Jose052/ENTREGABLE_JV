import CustomRouter from "../CustomRouter.js";

export default class AuthViewsRouter extends CustomRouter {
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

    this.read("/login", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("login", {
          title: "LOGIN",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
