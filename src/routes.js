const express = require("express");

const routes = express.Router();

routes.get("/estados", (req, res) => {
    const test = {
        total: [{estado: 'DF',
        casos: '16',
        days: [
            {
                data: "24-03-2020",
                qtd: 26,
                mortes: 2
            }
        ]}, {
            estado: 'SP',
        casos: '500',
        days: [
            {
                data: "24-03-2020",
                qtd: 225,
                mortes: 26
            }
        ]
        }]
    }
    return res.json(test)
});

routes.post("/estados", (req, res) => {
    const { uf, casos, data, qtd, mortes} = req.body;
    
    const body = {
        estado: uf,
        casos,
        days: [
            {
                data,
                qtd,
                mortes
            }
        ]
    }

    return res.json(body)
})

module.exports = routes; 