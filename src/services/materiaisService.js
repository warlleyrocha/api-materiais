const Material = require("../models/Material");

const materiaisService = {
  listar: async () => {
    return await Material.findAll();
  },
};

module.exports = materiaisService;
