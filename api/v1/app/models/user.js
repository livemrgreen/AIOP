var orm = require("../../config/models");
var Sequelize = orm.Sequelize();
var crypto = require("crypto");

module.exports = {
    "model": {

        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        },

        "username": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "unique": true,
            "validate": {
                "notNull": true,
                "notEmpty": true,
                "len": [2, 20]
            }
        },

        "password": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true
            }
        },

        "salt": {
            "type": Sequelize.STRING,
            "allowNull": false
        },

        "access_token": {
            "type": Sequelize.STRING,
            "allowNull": true
        }
    },

    "relations": {
    },

    "options": {
        "freezeTableName": true,
        "underscored": true,
        "paranoid": true,

        "instanceMethods": {
            "authenticate": function(password) {
                return this.encryptPassword(password) === this.password;
            },

            "makeSalt": function() {
                return Math.round((new Date().valueOf() * Math.random())) + "";
            },

            encryptPassword: function(password) {
                if (!password) return "";
                return crypto.createHmac("sha1", this.getDataValue("salt")).update(password).digest("hex");
            }
        }
    }
};