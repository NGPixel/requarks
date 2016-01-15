/// <reference path="../typings/tsd.d.ts" />

export = {

  promises: {
    browsefiles: null
  },

  data: {
    categories: [],
    status: [],
    types: [],
    priorities: [],
    properties: []
  },

  events: {
    dragcounter: 0
  },

  init() {

    // Set host listeners

    ipcRenderer.on('open-browsefiles-cback', function(event, arg) {
      AppStore.promises.browsefiles.resolve(arg);
    });

  },

  prepare_local() {

    let deferred = Q.defer();

    // Prepare local filesystem

    fs.stat(AppConfig.static.path, function(err, stats) {

      if(err || stats == null) {
        fs.mkdir(AppConfig.static.path, function() {
          fs.mkdir(path.join(AppConfig.static.path,'files'));
          fs.mkdir(path.join(AppConfig.static.path,'upload'));
          fs.mkdir(path.join(AppConfig.static.path,'logs'), function() {
            deferred.resolve();
          });
        });
      } else {
        deferred.resolve();
      }

    });

    return deferred.promise;

  },

  resync() {

    let self = this;
    let deferred = Q.defer();

    AppRemote.getStore(['categories','status','types','priorities','properties']).then(function (resp) {

      self.data.categories = resp.categories;
      self.data.types = resp.types;
      self.data.status = resp.status;
      self.data.priorities = resp.priorities;
      self.data.properties = resp.properties;

      if(self.data.categories.length == 0 || self.data.types.length == 0 || self.data.status.length == 0 || self.data.priorities.length == 0) {
        EE.emit('showError', "The application is not configured correctly. If you are the system administrator, you must create at least one category with their respective status, types and priorities.");
        Winston.warn('The application is not configured correctly on the server.');
      }

      deferred.resolve();

    }, function (error) {
        console.error(error);
        deferred.reject();
    });

    return deferred.promise;

  },

  // Open Browse Files dialog and return selection

  browse_files(diagArg) {
    this.promises.browsefiles = Q.defer();
    ipcRenderer.send('open-browsefiles', 'open-browsefiles-cback', diagArg);
    return this.promises.browsefiles.promise;
  },

  // Return files from app upload folder

  import_files() {
    let impfiles = fs.readdirSync(path.join(AppConfig.static.path,'upload'));
    impfiles = impfiles.map(function(p) {
      return path.join(path.join(AppConfig.static.path,'upload'),p);
    });
    return impfiles;
  },

  // Process files

  process_files(arr: Array<Object>, fpath: Array<string>) {

    fpath.forEach(function(f) {

      if(_.find(arr, 'filepath', f)) {
        return;
      }

      let fstat = fs.statSync(f);

      let fobj = {
        filepath: f,
        filename: f.split('\\').pop().split('/').pop(),
        filetype: f.split('.').pop().toLowerCase(),
        fileprop: [filesize(fstat.size)],
        filesize: filesize(fstat.size)
      };

      if(_.includes(['gif','jpg','png','bmp','psd','tiff'], fobj.filetype)) {
        let dims = sizeOf(f);
        fobj.fileprop.push(dims.width + 'x' + dims.height);
      }

      arr.push(fobj);

    });

    return arr;

  }

}
