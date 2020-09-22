const { request } = require('express');
const express = require('express');
const axios = require('axios');
const adapter = require('axios/lib/adapters/http');



const port = 8082;
const app = express();
app.use(express.json());

const pickerService = "http://localhost:8081";

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

const getPicker = async (id) => {
  try {
    const testid = id.toString();
    console.log(testid)
    return await axios.get(`${pickerService}/pickers/${testid}`)
  } catch (error) {
    console.error(error)
  }
};

const returnPicker = async(id) => {
  const pickerInfo = getPicker(id)
    .then(response => {
      if (response.data.name) {
        console.log(response.data.name);
      }
    })
    .catch(error => {
      console.log(error)
    })
}


app.get('/locals', (req,res) => {
  console.log("print of the locals to deposit recyclable product");
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
    console.log(collectionLocals[i].id);
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

app.post('/newCollaborator', (req,res) => {
  const {localId, pickerId} = req.body;
  const name = returnPicker(pickerId);
  
  const foundLocalId = collectionLocals.find(subject => subject.id === localId);

  if (foundLocalId) {
    console.log(collectionLocals);
  }



});



app.listen(port);
