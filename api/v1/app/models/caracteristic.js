var orm = require("../../config/models");
var Sequelize = orm.Sequelize();

module.exports = {
    "model": {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        },

        "label": {
            "type": Sequelize.STRING,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true,
                "len": [2, 20]
            }
        }
    },

    "relations": {
        "hasMany": {
            "reservation_request": {
                "joinTableName": "caracteristics_for_reservation_request",
                "foreignKeyConstraint": true
            },
            "room": {
                "joinTableName": "caracteristics_for_room",
                "foreignKeyConstraint": true
            }
        }
    },

    "configuration": {
        "freezeTableName": true,
        "underscored": true,
        "paranoid": true
    }
};