const express = require('express');

const eurekaHelper = require('./eureka-helper');

const PORT = 4000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

const waste_pickers = [
  {
    id: 1,
    name: "victor",
    picker_types: ["Metal"],
  },
  {
    id: 2,
    name: "izabella",
    picker_types: ["Paper","Glass"],
  },
  {
    id: 3,
    name: "daniel",
    picker_types: ["Plastic"],
  },
  {
    id: 4,
    name: "juaquin",
    picker_types: ["Metal"]
  },

];


app.get('/pickers', (req,res) => {
  res.json(waste_pickers);
});


app.get('/pickers/**', (req,res) => {
  const pickerId = parseInt(req.params[0]);
  const foundPicker = waste_pickers.find(subject => subject.id === pickerId)
  
  res.json(foundPicker);

});


app.post('/pickers', (req,res) => {
  const {id, name, type} = req.body;

  for (var i = 0; i < waste_pickers.length; i++) {
    if (id == waste_pickers[i].id) {
      return res.status(400).json({
        error: 'user registered'
      });
    };
}

  const new_picker = {
    id: id,
    name: name,
    picker_types: type,
  };

  waste_pickers.push(new_picker);

  res.json(new_picker);

});


app.listen(PORT, HOST);
eurekaHelper.registerWithEureka('user-service', PORT);
