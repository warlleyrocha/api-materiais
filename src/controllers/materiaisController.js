const materiaisService = require("../services/materiaisService");

const materiaisController = {
  listar: async (req, res) => {
    try {
      const materiais = await materiaisService.listar();
      res.json(materiais);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar materiais" });
    }
  },
};

module.exports = materiaisController;
