"use strict";
var path = require('path'), fs = require('fs'), Q = require('Q'), _ = require('lodash-modern');
var BrowserWindow = require('browser-window');
module.exports = function (app, ipcMain, dialog, windows, mainStore) {
    return {
        userStorePath: "",
        init: function () {
            var self = this;
            self.userStorePath = path.join(app.getPath("userData"), "/userStore.json");
            mainStore.user = {
                locale: 'en',
                domain: '',
                data: {}
            };
        },
        loadStore: function () {
            try {
                var userStoreContent = fs.readFileSync(this.userStorePath, 'utf8');
                if (userStoreContent != null && userStoreContent.length > 5) {
                    mainStore.user = _.defaultsDeep(JSON.parse(userStoreContent), mainStore.user);
                }
            }
            catch (ex) {
            }
        },
        saveStore: function () {
            fs.writeFile(this.userStorePath, JSON.stringify(mainStore.user), 'utf8', function (err) {
                if (err)
                    throw err;
            });
        },
    };
};
