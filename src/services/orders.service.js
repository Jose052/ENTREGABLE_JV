import { Orders } from "../data/mongo/manager.mongo.js";

class OrdersService {
  constructor() {
    this.model = Orders;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.ordersByUser(id);
  report = async (id) => await this.model.report(id);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const service = new OrdersService();
export default service;
