const Dia = require("../models/Dia");

module.exports = {
  // Função que retorna todos os casos e todos os dias
  async getAll(req, res) {
    const casos = await Dia.find();
    const [total] = await Dia.aggregate([
      { $match: {} },
      {
        $group: {
          _id: null,
          casos: { $sum: "$casos" },
          mortes: { $sum: "$mortes" }
        }
      }
    ]);

    return res.json({
      totalCasos: total.casos,
      totalMortes: total.mortes,
      casos
    });
  },

  //Função que retorna todos os casos por dia de um estado 
  async onlyState(req, res) {
    const { uf } = req.params;
    const estado = await Dia.find({ "estados.uf": uf.toUpperCase() }).select(
      "estados data "
    );

    const casosEstado = [];
    let casos = [];
    let mortes = [];

    estado.forEach(dia => {
      const data = dia.data;
      dia.estados.forEach(estado => {
        if (estado.uf === uf.toUpperCase()) {
          casos.push(estado.casos);
          mortes.push(estado.mortes);
          casosEstado.push({
            data,
            uf: estado.uf,
            casos: estado.casos,
            mortes: estado.mortes
          });
        }
      });
    });

    casos = casos.reduce((totalCasos, casoAtual) => totalCasos + casoAtual);
    mortes = mortes.map(morte => {
      if (morte === undefined) {
        return 0;
      }
      return morte;
    }).reduce((totalMortes, casoAtual) => {
      return totalMortes + casoAtual      
    });

    return res.json({casos, mortes, casosEstado});
  },
  // Função que retorna todos os casos de um dia
  async getAllStatesOnDate(req, res) {
    const { date } = req.params;

    const casosOnDate = await Dia.find({ data: date });
    return res.json(casosOnDate);
  },
  //Função que retorna os casos de um dia de um estado
  async getOneStateOnDate(req, res) {
    const { uf, date } = req.params;

    const casosData = await Dia.find({ data: date });

    const casosEstado = [];

    casosData.forEach(dia => {
      const data = dia.data;
      dia.estados.forEach(estado => {
        if (estado.uf === uf.toUpperCase()) {
          casosEstado.push({
            data,
            uf: estado.uf,
            casos: estado.casos,
            mortes: estado.mortes
          });
        }
      });
    });

    return res.json(casosEstado);
  },

  async create(req, res) {
    const { data, casos, mortes, estados } = req.body;

    const dia = new Dia({
      data,
      casos,
      mortes,
      estados
    });

    const diaS = await dia.save();

    res.json(diaS);
  }
};
