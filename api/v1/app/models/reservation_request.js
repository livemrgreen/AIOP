var orm = require("../../config/models");
var Sequelize = orm.Sequelize();

module.exports = {
    "model": {
        "id": {
            "type": Sequelize.INTEGER,
            "primaryKey": true,
            "autoIncrement": true
        }
    },

    "relations": {
        "belongsTo": {
            "time_slot": {
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
            "caracteristic": {
                "joinTableName": "caracteristics_for_reservation_request",
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