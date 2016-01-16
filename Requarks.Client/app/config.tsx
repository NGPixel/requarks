/// <reference path="../typings/tsd.d.ts" />

export = {

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

  user: {

  },

  init() {

    let deferred = Q.defer();

    // Get saved data

    if(localStorage.getItem('appconfig') !== null) {
      let rawConfig = JSON.parse(localStorage.getItem('appconfig'));
      this.data = _.defaultsDeep(rawConfig, this.data);
    }

    // Get statics from main process

    Q.all([

      (function() {
        let df = Q.defer();
        ipcRenderer.on('get-systempath-userdata', function(event, arg) {
          AppConfig.static.path_userdata = arg
          df.resolve();
        });
        ipcRenderer.send('get-systempath', 'get-systempath-userdata', 'userData');
        return df.promise;
      })(),
      (function() {
        let df = Q.defer();
        ipcRenderer.on('get-systempath-desktop', function(event, arg) {
          AppConfig.static.path_desktop = arg
          AppConfig.static.path = path.join(arg, 'Requarks');
          df.resolve();
        });
        ipcRenderer.send('get-systempath', 'get-systempath-desktop', 'desktop');
        return df.promise;
      })(),
      (function() {
        let df = Q.defer();
        ipcRenderer.on('get-systempath-documents', function(event, arg) {
          AppConfig.static.path_documents = arg
          df.resolve();
        });
        ipcRenderer.send('get-systempath', 'get-systempath-documents', 'documents');
        return df.promise;
      })(),
      (function() {
        let df = Q.defer();
        ipcRenderer.on('get-usrinfo-cback', function(event, arg) {
          AppConfig.user = arg
          df.resolve();
        });
        ipcRenderer.send('get-usrinfo', 'get-usrinfo-cback');
        return df.promise;
      })()

    ]).spread(function() {
      deferred.resolve();
    }, function() {
      deferred.reject();
    }).done();

    return deferred.promise;

  },

  save() {

    localStorage.setItem('appconfig', JSON.stringify(this.data));

  }

}
