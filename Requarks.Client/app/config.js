"use strict";
module.exports = {
    data: {
        locale: "en",
        default_category: 1,
        app_usenotifications: true,
        app_useemails: false,
        app_autostart: false,
        app_useadvanimations: false,
        service_domain: ''
    },
    static: {
        path: '',
        path_userdata: '',
        path_desktop: '',
        path_documents: ''
    },
    user: {},
    init: function () {
        var deferred = Q.defer();
        if (localStorage.getItem('appconfig') !== null) {
            var rawConfig = JSON.parse(localStorage.getItem('appconfig'));
            this.data = _.defaultsDeep(rawConfig, this.data);
        }
        Q.all([
            (function () {
                var df = Q.defer();
                ipcRenderer.on('get-systempath-userdata', function (event, arg) {
                    AppConfig.static.path_userdata = arg;
                    df.resolve();
                });
                ipcRenderer.send('get-systempath', 'get-systempath-userdata', 'userData');
                return df.promise;
            })(),
            (function () {
                var df = Q.defer();
                ipcRenderer.on('get-systempath-desktop', function (event, arg) {
                    AppConfig.static.path_desktop = arg;
                    AppConfig.static.path = path.join(arg, 'Requarks');
                    df.resolve();
                });
                ipcRenderer.send('get-systempath', 'get-systempath-desktop', 'desktop');
                return df.promise;
            })(),
            (function () {
                var df = Q.defer();
                ipcRenderer.on('get-systempath-documents', function (event, arg) {
                    AppConfig.static.path_documents = arg;
                    df.resolve();
                });
                ipcRenderer.send('get-systempath', 'get-systempath-documents', 'documents');
                return df.promise;
            })(),
            (function () {
                var df = Q.defer();
                ipcRenderer.on('get-usrdata-cback', function (event, arg) {
                    AppConfig.user = arg;
                    df.resolve();
                });
                ipcRenderer.send('get-usrdata', 'get-usrdata-cback');
                return df.promise;
            })()
        ]).spread(function () {
            deferred.resolve();
        }, function () {
            deferred.reject();
        }).done();
        return deferred.promise;
    },
    save: function () {
        localStorage.setItem('appconfig', JSON.stringify(this.data));
    }
};
