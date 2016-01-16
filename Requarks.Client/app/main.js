"use strict";

// Node Modules
var app = require('app');
var shell = require('shell');
var ipcMain = require('electron').ipcMain;
var dialog = require('electron').dialog;
var fs = require('fs');
var path = require('path');
var Q = require('Q');

// Electron Modules
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var Tray = require('tray');

// Global references
var windows = {
	mainWindow: null,
	splashWindow: null,
	authWindow: null,
	firstsetupWindow: null,
	appIcon: null,
	loadState: {
		main: false,
		auth: false
	},
	showMainWindow: function() {
		this.mainWindow.loadUrl('file://' + __dirname + '/index.html');
	},
	setLoadingText: function(txt) {
		this.splashWindow.webContents.executeJavaScript("setLoadingText('" + txt + "')");
	}
};
var mainStore = {
	usrData: {}
};

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// Unregister before quitting
app.on('will-quit', function () {
	//appIcon.destroy();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

	// Main Window

	windows.mainWindow = new BrowserWindow({
		icon: __dirname + '/images/requarks-logo.png',
		width: 1280,
		height: 768,
		minWidth: 1280,
		minHeight: 768,
		show: false,
		backgroundColor: '#8b1515',
		autoHideMenuBar: true
	});
	windows.mainWindow.on('closed', function () {
		windows.mainWindow = null;
	});

	//mainWindow.webContents.openDevTools();

	var mainMenuTemplate = require('./main-menu.js');
	var mainMenu = Menu.buildFromTemplate(mainMenuTemplate.template);
	Menu.setApplicationMenu(mainMenu);

	// Splash Window

	windows.splashWindow = new BrowserWindow({
		center: true,
		width: 800,
		height: 400,
		skipTaskbar: true,
		frame: false,
		resizable: false,
		show: false,
		backgroundColor: '#8b1515',
		autoHideMenuBar: true,
		alwaysOnTop: true
	});
	windows.splashWindow.on('closed', function () {
		windows.splashWindow = null;
	});
	windows.splashWindow.webContents.on('did-finish-load', function() {

		require('./core/listeners')(app, ipcMain, dialog, windows, mainStore);
		var auth = require('./core/auth')(app, ipcMain, dialog, windows, mainStore);
		auth.init();

		let tokVal = auth.validateToken();
		windows.setLoadingText('Authenticating');

		setTimeout(function() {

			tokVal.then(function() {

				windows.setLoadingText('Fetching Server Data');
				windows.showMainWindow();

			}, function() {

				windows.setLoadingText('Preparing Login Modal');
				auth.startAuthServer();
				windows.authWindow.webContents.on('did-finish-load', function() {
					if(!windows.loadState.auth) {
						windows.splashWindow.hide();
						windows.authWindow.show();
						windows.loadState.auth = true;
					}
				});
				windows.authWindow.loadUrl('http://localhost:3000/');

			});

		}, 1000);

	});
	windows.splashWindow.loadUrl('file://' + __dirname + '/splash.html');

	windows.splashWindow.show();

	//var fsetup = require('./core/firstsetup')(app, ipcMain, dialog, windows, mainStore);
	//fsetup.start();

	// Tray

	/*appIcon = new Tray(__dirname + '/images/requests-logo.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Open', type: 'normal' },
    { label: 'Snooze notifications...', type: 'normal' },
    { type: 'separator' },
    { label: 'Exit', type: 'normal' }
  ]);
  appIcon.setToolTip('Requests');
  appIcon.setContextMenu(contextMenu);*/

});
