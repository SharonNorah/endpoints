const Joi = require("joi"); //module returns a class
const express = require("express");
const app = express(); //returns an object of type express, called app by convention
app.use(express.json());
const interventions = [
  { id: 1, name: "intervention1" },
  { id: 2, name: "intervention2" },
  { id: 3, name: "intervention3" }
];

app.get("/", (req, res) => {
  res.send("helloworld! am building endpoints");
});
app.get("/api/interventions", (req, res) => {
  res.send(interventions); //return interventions array
});
app.post("/api/nterventions", (req, res) => {
  const { error } = validateIntervention(req.body); //getting result.error
  if (error) {
    //400 bad request
    res, status(400).send(result.error.details[0].message);
    return;
  }
  const intervention = {
    id: interventions.length + 1,
    name: req.body.name //reading from the body of the request
  };
  interventions.push(intervention);
  res.send(intervention);
});
app.put("/api/interventions/:id", (req, res) => {
  //look for the intervention
  //if doesn't exit return 404
  const intervention = interventions.find(
    c => c.id === parseInt(req.params.id)
  );
  if (!intervention)
    res.status(404).send("the intervention with the given id was not found");
  //validate
  const { error } = validateIntervention(req.body); //getting result.error
  if (error) {
    //400 bad request
    res, status(400).send(result.error.details[0].message);
    return;
  }
  //update the intervention
  intervention.name = req.body.name;
  //return updated intervention to client
  res.send(intervention);
});
function validateIntervention(intervention) {
  const schema = {
    name: Joi.string()
      .min(3)
      .require()
  };
  return Joi.validate(intervention, schema); //returns an object
}
app.get("/api/interventions/:id", (req, res) => {
  const intervention = interventions.find(
    c => c.id === parseInt(req.params.id)
  ); //return intervention of a given id
  //404(object not found)
  if (!intervention)
    res.status(404).send("the intervention with the given id was not found");
  res.send(intervention);
});
//PORT env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
//app.listen(3000, () => console.log("listening on port 3000..."));
