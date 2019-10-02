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
  if (!req.body.name || req.body.name.length > 3) {
    //400 bad request
    res,
      status(400).send("name is required and should be minimum 3 characters");
    return;
  }
  const intervention = {
    id: interventions.length + 1,
    name: req.body.name //reading from the body of the request
  };
  interventions.push(intervention);
  res.send(intervention);
});
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
