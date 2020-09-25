const { request } = require('express');
const express = require('express');

const axios = require('axios');

const eurekaHelper = require('./eureka-helper');

const PORT = 3000;
const HOST = '0.0.0.0'
const pickerService = "http://zuul-gateway:8050/user-service";

const app = express();
app.use(express.json());

const collectionLocals = [
  {
    id: 1,
    local_name: "RECIcle",
    city: "Recife",
    state: "PE",
    street: "Rua Advogado Clarindo",
    cep: "50980-760",
    local_number: "42",
    object_types: ["Plastic","Paper"],
    collaborators: []
  },
  {
    id: 2,
    local_name: "Metal Reciclavel",
    city: "Recife",
    state: "PE",
    street: "Avenida Advogado José Paulo Cavalcanti",
    cep: "50080-810",
    local_number: "23",
    object_types: ["Metal"],
    collaborators: []
  },
  {
    id: 3,
    local_name: "Papel e Vidros",
    city: "Recife",
    state: "PE",
    street: "Rua Afonso Costa",
    cep: "50040-120",
    local_number: "42",
    object_types: ["Paper","Glass"],
    collaborators: []
  },
  {
    id: 4,
    local_name: "+PLANETA",
    city: "Recife",
    state: "PE",
    street: "Rua Afonso Batista",
    cep: "52021-020",
    local_number: "42",
    object_types: ["Plastic","Metal","Paper","Glass"],
    collaborators: []
  },

];

const getPicker = (id) => {
    const myId = id.toString();
    return axios.get(`${pickerService}/pickers/${myId}`)
    .then(resp => resp.data)
    
};

const returnPicker = async(id) => {
  try {
    return await getPicker(id);
  } catch(e) {
    console.error(e)
  }
};
  

app.get('/locals', (req,res) => {
  res.json(collectionLocals);
});

app.post('/locals', (req,res) => {

  const {
    id,
    local_name, 
    city, 
    state, 
    street, 
    cep, 
    local_number, 
    object_types, 
    collaborators} = req.body;

  for (var i = 0; i < collectionLocals.length; i++) {
    if (id == collectionLocals[i].id) {
      return res.status(400).json({
        error: 'local registered'
      });
    };

  const new_collector_local = {
    id: id,
    local_name: local_name,
    city: city,
    state: state,
    street: street,
    cep: cep,
    local_number: local_name, 
    object_types: object_types,
    collaborators: collaborators
  };

  collectionLocals.push(new_collector_local);

  res.json(collectionLocals);

}
});

app.post('/newCollaborator', async (req,res) => {
  const {pickerId} = req.body;
  const {localId} = req.body;
  console.log(localId);
  const data = await returnPicker(pickerId);
  
  const foundLocal = collectionLocals.find(subject => subject.id === parseInt(localId));

  if (foundLocal) {
    foundLocal.collaborators.push(data.name);
    return res.json(foundLocal);
  }
  res.status(404).json({error: 'Local not found'})
  
});



app.listen(PORT, HOST);
eurekaHelper.registerWithEureka('collection-service', PORT);
