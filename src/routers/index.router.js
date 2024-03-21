import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.api.js";
import ViewsRouter from "./views/index.views.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
  }
}
