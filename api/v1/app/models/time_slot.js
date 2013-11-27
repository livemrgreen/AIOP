var orm = require("../../config/models");
var Sequelize = orm.Sequelize();

module.exports = {
    "model": {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        },
        "start": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true
            }
        },
        "end": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true
            }
        }
    },

    "relations": {
        "hasMany": {
            "reservation": {
                "foreignKeyConstraint": true
            },
            "reservation_request": {
                "as": "request",
                "foreignKeyConstraint": true
            }
        }
    },

    "configuration": {
        "freezeTableName": true,
        "underscored": true,
        "timestamps": false
    }
};