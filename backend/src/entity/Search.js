const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Search",
  tableName: "searches",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    city: {
      type: "varchar",
    },
    country: {
      type: "varchar",
      nullable: true,
    },
    temperature: {
      type: "float",
      nullable: true,
    },
    description: {
      type: "varchar",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});