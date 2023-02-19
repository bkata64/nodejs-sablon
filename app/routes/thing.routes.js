module.exports = app => {
    const things = require("../controllers/thing.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Thing
    router.post("/", things.create);
  
    // Retrieve all Things
    router.get("/", things.findAll);
  
    // Retrieve all field3 Things
    router.get("/field3", things.findAllField3);
  
    // Retrieve a single Thing with id
    router.get("/:id", things.findOne);
  
    // Update a Thing with id
    router.put("/:id", things.update);
  
    // Delete a Thing with id
    router.delete("/:id", things.delete);
  
    // Delete all Things
    router.delete("/", things.deleteAll);
  
    app.use('/api/things', router);
  };