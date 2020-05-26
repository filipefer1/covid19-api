const axios = require("axios");

const fetchStatesData = async () => {
  const estados = [];
  const covidData = await axios.get(
    "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstado"
  );

  for (const state of covidData.data) {
    let stateData = await axios.get(
      `https://covid-api-brasil.herokuapp.com/${state.nome}`
    );

    estados.push({
      uf: state.nome,
      casos: state.casosAcumulado - stateData.data.casos,
      mortes: state.obitosAcumulado - stateData.data.mortes,
    });
  }
  return estados.sort((uf1, uf2) => {
    return uf1.uf > uf2.uf ? 1 : uf2.uf > uf1.uf ? -1 : 0;
  });
};

const fetchCountryData = async () => {
  const country = await axios.get(
    "https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeralApi"
  );

  const response = {
    data: new Date().toISOString().split("T")[0],
    casos: country.data.confirmados.novos,
    mortes: country.data.obitos.novos,
  };

  return response;
};

module.exports = { fetchStatesData, fetchCountryData };
