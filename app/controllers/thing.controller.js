const db = require("../models");
const Thing = db.things;
const Op = db.Sequelize.Op;

// Create and Save a new Thing
exports.create = (req, res) => {
    // Validate request
    if (!req.body.field1) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Thing
    const thing = {
      field1: req.body.field1,
      field2: req.body.field2,
      field3: req.body.field3 ? req.body.field3 : false
    };
  
    // Save Thing in the database
    Thing.create(thing)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Thing."
        });
      });
  };

// Retrieve all Things from the database.
exports.findAll = (req, res) => {
    const field1 = req.query.field1;
    var condition = field1 ? { field1: { [Op.like]: `%${field1}%` } } : null;
  
    Thing.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving things."
        });
      });
  };


// Find a single Thing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Thing.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Thing with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Thing with id=" + id
      });
    });
};

// Update a Thing by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Thing.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Thing was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Thing with id=${id}. Maybe Thing was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Thing with id=" + id
        });
      });
  };

// Delete a Thing with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Thing.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Thing was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Thing with id=${id}. Maybe Thing was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Thing with id=" + id
        });
      });
  };

// Delete all Things from the database.
exports.deleteAll = (req, res) => {
    Thing.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Things were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all things."
        });
      });
  };

// Find all field3 Things
exports.findAllField3 = (req, res) => {
    Thing.findAll({ where: { field3: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving things."
        });
      });
  };