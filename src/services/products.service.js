import { Products } from "../data/mongo/manager.mongo.js";

class ProductsService {
  constructor() {
    this.model = Products;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const service = new ProductsService();
export default service;