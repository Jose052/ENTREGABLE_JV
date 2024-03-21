import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  SECRET: process.env.SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  clientIdGoogle: process.env.clientSecretGoogle,
  clientSecretGoogle: process.env.clientSecretGoogle
};
