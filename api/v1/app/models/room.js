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
            "unique": true,
            "validate": {
                "notNull": true,
                "notEmpty": true,
                "len": [2, 20]
            }
        },
        "capacity": {
            "type": Sequelize.INTEGER,
            "allowNull": false,
            "validate": {
                "notNull": true,
                "notEmpty": true,
                "min": 15,
                "max": 200
            }
        }
    },

    "relations": {
        "belongsTo": {
            "building": {
                "foreignKeyConstraint": true
            }
        },
        "hasMany": {
            "reservation": {
                "foreignKeyConstraint": true
            },
            "caracteristic": {
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