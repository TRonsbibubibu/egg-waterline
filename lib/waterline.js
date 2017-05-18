/**
 * Created by trons on 2017/5/15.
 */
const Waterline = require('waterline');
const mongoAdapter = require('sails-mongo');
const assert = require('assert');
const path = require('path');

module.exports = app => {
    const config = app.config.waterline;
    assert(config.db[0].url, '[egg-waterline] url is required on config');

    app.coreLogger.info('[egg-waterline] connect to %s', config.url);

    const mountPoint = config.mount || 'model'

    let wlconfig = {
        adapters: {},

        connections: {},

        defaults: {
            migrate: 'safe',
        }
    };

    let adapter;
    config.db.forEach(cfg => {
        switch (cfg.adapter) {
            case 'mongodb':
                adapter = require('sails-mongo');
                wlconfig.adapters[cfg.name] = adapter;
                wlconfig.connections[cfg.name] = {
                    adapter: cfg.name,
                    url: cfg.url,
                };
                break;
            default:
                assert(adapter, 'adapter illegal');
                break;
        }
    });

    loadModel(app, mountPoint);
    app.waterline = new Waterline();

    for (let modelName in app[mountPoint]) {
        let model = Waterline.Collection.extend(app[mountPoint][modelName]);
        app.waterline.loadCollection(model);
    }

    app.waterline.initialize(wlconfig, (err, models) => {
        app.model = models.collections;
        app.connections = models.connections;
        app.coreLogger.info('[egg-waterline]initialize successful')
    })
};

function loadModel(app, mountPoint) {
    const dir = path.join(app.config.baseDir, 'app/' + mountPoint);
    app.loader.loadToApp(dir, mountPoint, {
        inject: app,
        caseStyle: 'upper',
    });
}