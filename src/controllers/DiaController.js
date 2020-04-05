const Dia = require("../models/Dia");
const errorHandler = require("../utils/errorHandler");
const dateFormat = /([2]\d{3}-(0[2-4]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
module.exports = {
  // Função que retorna todos os casos e todos os dias
  async getAll(req, res, next) {
    try {
      const casos = await Dia.find(null, {_id: 0, "casos._id": 0, "estados._id": 0, "__v":0});
      const [total] = await Dia.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            casos: { $sum: "$casos" },
            mortes: { $sum: "$mortes" },
          },
        },
      ]);

      return res.status(200).json({
        totalCasos: total.casos,
        totalMortes: total.mortes,
        casos,
      });
    } catch (err) {
      next(err);
    }
  },

  //Função que retorna todos os casos por dia de um estado
  async onlyState(req, res, next) {
    const { uf } = req.params;

    if (uf.length !== 2) {
      const error = errorHandler("Tamanho da UF inválido.");
      return next(error);
    }

    const checkUf = ufs.find((estadoUf) => estadoUf === uf.toUpperCase());

    if (!checkUf) {
      const error = errorHandler("UF inexistente!");
      return next(error);
    }

    try {
      const estado = await Dia.find({ "estados.uf": uf.toUpperCase() }).select(
        "estados data "
      );

      const casosEstado = [];
      let casos = [];
      let mortes = [];

      estado.forEach((dia) => {
        const data = dia.data;
        dia.estados.forEach((estado) => {
          if (estado.uf === uf.toUpperCase()) {
            casos.push(estado.casos);
            mortes.push(estado.mortes);
            casosEstado.push({
              data,
              uf: estado.uf,
              casos: estado.casos,
              mortes: estado.mortes,
            });
          }
        });
      });

      casos = casos.reduce((totalCasos, casoAtual) => totalCasos + casoAtual);
      mortes = mortes
        .map((morte) => {
          if (morte === undefined) {
            return 0;
          }
          return morte;
        })
        .reduce((totalMortes, casoAtual) => {
          return totalMortes + casoAtual;
        });

      return res.status(200).json({ casos, mortes, casosEstado });
    } catch (err) {
      next(err);
    }
  },
  // Função que retorna todos os casos de um dia
  async getAllStatesOnDate(req, res, next) {
    const { date } = req.params;

    try {
      const casosOnDate = await Dia.find({ data: date }, {_id: 0, "estados._id": 0, "__v":0});

      if (casosOnDate.length === 0) {
        const error = errorHandler(" Data não encontrada. Utilize datas a partir de 2020-02-26 e o formato 'YYYY-MM-DD' ");
        return next(error);
      }

      return res.json(casosOnDate);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  },
  //Função que retorna os casos de um dia de um estado
  async getOneStateOnDate(req, res, next) {
    const { uf, date } = req.params;

    if (uf.length !== 2) {
      const error = errorHandler("Tamanho da UF inválido.");
      return next(error);
    }

    const checkUf = ufs.find((estadoUf) => estadoUf === uf.toUpperCase());

    if (!checkUf) {
      const error = errorHandler("UF inexistente!");
      return next(error);
    }

    try {
      const casosData = await Dia.find({ data: date }, {_id: 0});

      if (casosData.length === 0) {
        const error = errorHandler("Data não encontrada. Utilize datas a partir de 2020-02-26 e o formato 'YYYY-MM-DD'");
        return next(error);
      }
      const casosEstado = [];

      casosData.forEach((dia) => {
        const data = dia.data;
        dia.estados.forEach((estado) => {
          if (estado.uf === uf.toUpperCase()) {
            casosEstado.push({
              data,
              uf: estado.uf,
              casos: estado.casos,
              mortes: estado.mortes,
            });
          }
        });
      });

      return res.json(casosEstado);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res) {
    const { data, casos, mortes, estados } = req.body;

    const dia = new Dia({
      data,
      casos,
      mortes,
      estados,
    });

    const diaS = await dia.save();

    res.json(diaS);
  },
};
