const mongoose = require("mongoose");

const { Schema } = mongoose;

const Dia = new Schema({
  data: {
    type: String,
    required: true,
  },
  casos: {
    type: Number,
    required: true,
  },
  mortes: Number,
  estados: [
    {
      uf: {
        type: String,
        required: true,
      },
      casos: {
        type: Number,
        required: true,
      },
      mortes: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Dia", Dia);
