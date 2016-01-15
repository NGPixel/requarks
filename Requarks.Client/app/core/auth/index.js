"use strict";
var path = require('path'), fs = require('fs'), Q = require('Q');
var BrowserWindow = require('browser-window');
module.exports = function (app, ipcMain, dialog, windows, mainStore) {
    return {
        credStorePath: "",
        credStore: {
            tokAccess: '',
            tokId: ''
        },
        init: function () {
            var self = this;
            self.credStorePath = path.join(app.getPath("userData"), "/credStore.json");
            ipcMain.on('auth-logout', function (event) {
                self.credStore = {
                    tokAccess: '',
                    tokId: ''
                };
                self.saveCredStore();
                dialog.showMessageBox(null, {
                    type: 'info',
                    title: 'Logout successful',
                    message: 'The application will now exit.',
                    buttons: ['OK']
                }, function () {
                    app.quit();
                });
            });
            ipcMain.on('auth-callback', function (event, tokAccess, tokId) {
                self.credStore.tokAccess = tokAccess;
                self.credStore.tokId = tokId;
                windows.authWindow.close();
                windows.splashWindow.show();
                windows.setLoadingText('Authenticating');
                self.validateToken().then(function () {
                    self.saveCredStore();
                    windows.setLoadingText('Fetching Server Data');
                    windows.showMainWindow();
                }, function (err) {
                    windows.splashWindow.close();
                    dialog.showErrorBox("Authentication Failed", err);
                    app.quit();
                });
            });
            self.loadCredStore();
        },
        startAuthServer: function () {
            windows.authWindow = new BrowserWindow({
                icon: app.getAppPath() + '/images/requests-logo.png',
                center: true,
                width: 1280,
                height: 768,
                resizable: false,
                show: false,
                backgroundColor: '#8b1515',
                autoHideMenuBar: true
            });
            windows.authWindow.on('closed', function () {
                windows.authWindow = null;
            });
            var cookieParser = require('cookie-parser');
            var express = require('express');
            var express_session = require('express-session');
            var authApp = express();
            authApp.use(cookieParser());
            authApp.use(express_session({ secret: '&W/v-vnrV8$2xO/s/U)l@4!^{r8).~s98A,mO@*! 2$k0tm$z,;zU]p+g)=(lr|+', resave: false, saveUninitialized: false }));
            authApp.use('/images', express.static(path.join(app.getAppPath(), '/images')));
            authApp.get('/', function (req, res) {
                res.sendFile(path.join(app.getAppPath(), '/auth.html'));
            });
            authApp.listen(3000);
        },
        loadCredStore: function () {
            try {
                var credStoreContent = fs.readFileSync(this.credStorePath, 'utf8');
                if (credStoreContent != null && credStoreContent.length > 5) {
                    this.credStore = JSON.parse(credStoreContent);
                }
            }
            catch (ex) {
                dialog.showErrorBox("Cred Store Access Denied", ex);
                app.quit();
            }
        },
        saveCredStore: function () {
            fs.writeFile(this.credStorePath, JSON.stringify(this.credStore), 'utf8', function (err) {
                if (err)
                    throw err;
            });
        },
        validateToken: function () {
            var self = this;
            var deferred = Q.defer();
            if (self.credStore.tokId == null || self.credStore.tokId.length < 10) {
                deferred.reject('Missing or Invalid Token ID');
            }
            else {
                var RQ = require('request');
                RQ.post({
                    url: "https://requests.auth0.com/tokeninfo",
                    withCredentials: false,
                    body: { id_token: self.credStore.tokId },
                    json: true
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        try {
                            if (body != null && body.user_id != null && body.user_id.length > 2) {
                                if (body.email != null && body.email.length > 3) {
                                    mainStore.usrData = body;
                                    deferred.resolve();
                                }
                                else {
                                    deferred.reject('Authentication Provider not properly configured. Missing email permission.');
                                }
                            }
                            else {
                                deferred.reject('Invalid Token Authentication Response');
                            }
                        }
                        catch (ex) {
                            deferred.reject('Failed to parse Token Authentication Response: ' + ex);
                        }
                    }
                    else {
                        deferred.reject('Authentication was denied');
                    }
                });
            }
            return deferred.promise;
        }
    };
};
