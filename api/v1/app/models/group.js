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
        }
    },

    "relations": {
        "hasMany": {
            "group": {
                "as": "children",
                "foreignKey": "parent_id",
                "useJunctionTable": false
            },
            "teaching": {
                "foreignKeyConstraint": true
            }
        },
        "belongsTo": {
            "group": {
                "as": "parent",
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