var orm = require("../../config/models");
var Sequelize = orm.Sequelize();
var crypto = require("crypto");
var jwt = require("jwt-simple");

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
            "allowNull": false
        }
    },

    "relations": {
    },

    "configuration": {
        "freezeTableName": true,
        "underscored": true,
        "paranoid": true,

        "instanceMethods": {
            "authenticate": function (password) {
                return this.encryptPassword(password) === this.password;
            },

            "makeSalt": function () {
                return Math.round((new Date().valueOf() * Math.random())) + "";
            },

            encryptPassword: function (password) {
                if (!password) return "";
                return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
            },

            "makeToken": function () {
                return jwt.encode(this.username + new Date().valueOf(), this.salt);
            }
        },

        "classMethods": {
            "structure": function () {
                return {
                    "username": {
                        "type": "string",
                        "options": {
                            "required": "required",
                            "min": 2,
                            "max": 20
                        }
                    },

                    "password": {
                        "type": "string",
                        "options": {
                            "required": "required"
                        }
                    }
                };
            }
        }
    }
};