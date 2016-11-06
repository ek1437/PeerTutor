//'use strict';
//const Sequelize = require('sequelize');
//const bcrypt = require('bcrypt-nodejs');
//
//module.exports = function(sequelize, DataTypes) {
//  var users = sequelize.define('users', {
//    fname: DataTypes.STRING,
//    lname: DataTypes.STRING,
//    email: DataTypes.STRING,
//    password: DataTypes.STRING
//  }, {
//    classMethods: {
//      associate: function(models) {
//        // associations can be defined here
//      }
//    }
//  });
//  return users;
//};
'use strict';
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    fname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
//        primaryKey: true,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
    
    User.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
            resolve(hashedPassword);
        });
    }).then((hashedPw) => {
        user.password = hashedPw;
    })
    );
    
  return User;
};