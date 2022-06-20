import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({
  path: path.join(path.resolve("."), "../.env"),
});

import { ConfigService } from "./config.service";

const config = new DataSource(new ConfigService().orm);

export default config;
