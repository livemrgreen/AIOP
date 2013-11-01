var filesystem = require("fs");
var models = {};
var relationships = {};

var singleton = function singleton() {
    var Sequelize = require("sequelize");
    var sequelize = null;

    this.setup = function (database, username, password, obj) {

        if (arguments.length == 2) {
            sequelize = new Sequelize(database, username);
        }
        else if (arguments.length == 3) {
            sequelize = new Sequelize(database, username, password);
        }
        else if (arguments.length == 4) {
            sequelize = new Sequelize(database, username, password, obj);
        }

        init();
    }

    this.dbCompositeIndex = function () {
        sequelize.getQueryInterface().addIndex('reservation', ['date', 'time_slot_id', 'room_id'], {"indicesType": "UNIQUE"});
    }

    this.model = function (name) {
        return models[name];
    }

    this.Sequelize = function () {
        return Sequelize;
    }

    this.sequelize = function () {
        return sequelize;
    }

    function init() {
        filesystem.readdirSync("./app/models").forEach(function (name) {
            var object = require("../app/models/" + name);
            var config = object.configuration || {};
            var modelName = name.replace(/\.js$/i, "");

            models[modelName] = sequelize.define(modelName, object.model, config);

            if ("relations" in object) {
                relationships[modelName] = object.relations;
            }
        });

        for (var model in relationships) {
            var relations = relationships[model];
            for (var relation in relations) {
                var related = relations[relation];
                for (var rel_model in related) {
                    var rel_opt = related[rel_model];
                    models[model][relation](models[rel_model], rel_opt);
                }
            }
        }
    }

    if (singleton.caller != singleton.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
}

singleton.instance = null;

singleton.getInstance = function () {
    if (this.instance === null) {
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();