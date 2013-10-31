var orm = require("../../config/models");
var Sequelize = orm.Sequelize();

module.exports = {
    "model": {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        },
        "date": {
            "type": Sequelize.DATE,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true
            }
        }
    },

    "relations": {
        "belongsTo": {
            "time_slot": {
                "as": "slot",
                "foreignKeyConstraint": true
            },
            "room": {
                "foreignKeyConstraint": true
            },
            "teaching": {
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
        "paranoid": true
    }
}
;