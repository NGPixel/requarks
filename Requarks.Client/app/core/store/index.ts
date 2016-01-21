var path = require('path'),
    fs = require('fs'),
    Q = require('Q'),
    _ = require('lodash-modern');
var BrowserWindow = require('browser-window');

export = function(app, ipcMain, dialog, windows, mainStore) {

  return {

    userStorePath: "",

    /*-------------------------------------------------*\
    || INITIALIZE USER STORE
    \*-------------------------------------------------*/

    init() {

      let self = this;
      self.userStorePath = path.join(app.getPath("userData"), "/userStore.json");

      mainStore.user = {
        locale: 'en',
        domain: '',
        data: {}
      };

    },

    /*-------------------------------------------------*\
    || LOAD USER STORE FROM DISK
    \*-------------------------------------------------*/

    loadStore() {
      try {
        let userStoreContent = fs.readFileSync(this.userStorePath, 'utf8');
        if(userStoreContent != null && userStoreContent.length > 5) {
          mainStore.user = _.defaultsDeep(JSON.parse(userStoreContent), mainStore.user);
        }
      } catch(ex) {
        // first time user, continue
      }
    },

    /*-------------------------------------------------*\
    || SAVE USER STORE TO DISK
    \*-------------------------------------------------*/

    saveStore() {
      fs.writeFile(this.userStorePath, JSON.stringify(mainStore.user), 'utf8', function(err) {
        if (err) throw err;
      });
    },

  }

}
