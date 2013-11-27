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
            "teacher": {
                "foreignKeyConstraint": true
            },
            "group": {
                "foreignKeyConstraint": true
            },
            "lesson": {
                "foreignKeyConstraint": true
            }
        },
        "hasOne": {
            "reservation": {
                "foreignKeyConstraint": true
            }
        },
        "hasMany": {
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