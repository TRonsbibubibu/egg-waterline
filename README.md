# egg-waterline

egg waterline plugin 

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Install

```shell
$ npm i egg-mongoose --save
```

### Usage

```javascript
// {app_root}/config/plugin.js
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
```

### Configuration

```javascript
// {app_root}/config/config.default.js
config.waterline = [{
        name: 'mongo',
        url: 'mongodb://192.168.199.218/yizhen-web',
        adapter: 'mongodb',
        options: {},
    }];
```

### Example

```javascript
// app/model/platform_tasks.js
const PlatformTask = {
    identity: 'platformtasks',
    attributes: {
        _id: 'string',
        publishTaskId: 'string',
        platformId: 'string',
        channelId: 'string',
        config: 'string',
        createTime: 'date',
        status: 'string',
    },
    connection: 'mongo',
};

module.exports = PlatformTask;

// app/controller/user.js
* index() {
            const {ctx, app} = this;
            let q = yield app.model.platformtasks.find().limit(1);
            console.log(q);
        }
```