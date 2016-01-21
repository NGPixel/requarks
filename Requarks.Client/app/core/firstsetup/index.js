"use strict";
var path = require('path'), fs = require('fs'), Q = require('Q');
var BrowserWindow = require('browser-window');
module.exports = function (app, ipcMain, dialog, windows, mainStore, fsetup_completed) {
    return {
        init: function () {
            var self = this;
            ipcMain.on('firstsetup-finish', function (event) {
                windows.firstsetupWindow.close();
                windows.splashWindow.show();
                fsetup_completed.resolve();
            });
        },
        start: function () {
            windows.firstsetupWindow = new BrowserWindow({
                icon: app.getAppPath() + '/images/requarks-logo.png',
                center: true,
                width: 1280,
                height: 768,
                frame: false,
                resizable: false,
                show: true,
                backgroundColor: '#8b1515',
                autoHideMenuBar: true
            });
            windows.firstsetupWindow.on('closed', function () {
                windows.firstsetupWindow = null;
            });
            windows.firstsetupWindow.loadUrl('file://' + path.join(app.getAppPath(), '/core/firstsetup/fsetup.html'));
        }
    };
};
