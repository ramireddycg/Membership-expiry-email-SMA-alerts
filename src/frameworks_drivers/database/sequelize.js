const Sequelize = require("sequelize");

const studentModel = require("./models/Student");
const sendMessageModel = require("./models/SendMessage");
const messageTypeModel = require("./models/MessageType");

const sequelize = new Sequelize("365vaidyam", "vaidyam365", "evpl12345",  // Prod Database 
//const sequelize = new Sequelize("365devdb","postgres", "12345",  // Test Database 
 {
  
   host: "database-1.cxsqrrlm9txi.ap-south-1.rds.amazonaws.com",
  //host: "locakhost",
  dialect: "postgres",
  port:5432,

  pool: {

    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// model definition

const Student = studentModel(sequelize, Sequelize);
const SendMessage = sendMessageModel(sequelize, Sequelize);
const MessageType = messageTypeModel(sequelize, Sequelize);

// Model RelationShip

module.exports = sequelize;



