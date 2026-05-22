require("reflect-metadata");
const { DataSource } = require("typeorm");
const Search = require("./entity/Search");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "12345",
  database: process.env.DB_NAME || "weather_app",
  synchronize: true,
  logging: false,
  entities: [Search],
});

module.exports = AppDataSource;