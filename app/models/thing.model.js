module.exports = (sequelize, Sequelize) => {
    const Thing = sequelize.define("thing", {
      field1: {
        type: Sequelize.STRING
      },
      field2: {
        type: Sequelize.STRING
      },
      field3: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Thing;
  };