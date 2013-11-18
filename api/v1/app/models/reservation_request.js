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
                "notEmpty": true,
                "isDate": true
            }
        },
        "capacity": {
            "type": Sequelize.INTEGER,
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
            "teaching": {
                "foreignKeyConstraint": true
            }
        },
        "hasOne": {
            "reservation": {
                "foreignKeyConstraint": true
            }
        },
        "hasMany": {
            "characteristic": {
                "joinTableName": "characteristics_for_reservation_request",
                "foreignKeyConstraint": true
            }
        }
    },

    "configuration": {
        "freezeTableName": true,
        "underscored": true,
        "timestamps": false
    }
}
;