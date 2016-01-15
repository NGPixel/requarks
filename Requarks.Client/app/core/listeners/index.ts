export = function(app, ipcMain, dialog, windows, mainStore) {

  // LISTENERS

  ipcMain.on('app-main-loaded', function(event) {
  	if(!windows.loadState.main) {
  		windows.loadState.main = true;
  		windows.splashWindow.close();
  	  windows.mainWindow.show();
  		windows.mainWindow.maximize();
  	}
  });

  ipcMain.on('reload-app', function(event) {
    windows.mainWindow.webContents.reload();
  });

  ipcMain.on('exit-app', function(event) {
    app.quit();
  });

  ipcMain.on('get-systempath', function(event, cback, arg) {
    event.sender.send(cback, app.getPath(arg));
  });

  ipcMain.on('get-usrinfo', function(event, cback) {
    event.sender.send(cback, mainStore.usrData);
  });

  ipcMain.on('open-browsefiles', function(event, cback, arg) {
  	dialog.showOpenDialog(arg, function(res) {
  		event.sender.send(cback, res);
  	});
  });

};
