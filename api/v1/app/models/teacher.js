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
            "person": {
                "foreignKeyConstraint": true
            }
        },
        "hasOne": {
            "administrator": {
                "foreignKeyConstraint": true
            },
            "module_manager": {
                "as": "manager",
                "foreignKeyConstraint": true
            }
        },
        "hasMany": {
            "teaching": {
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