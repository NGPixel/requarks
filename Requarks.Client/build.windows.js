var Q = require('q');
var childProcess = require('child_process');
var asar = require('asar');
var jetpack = require('fs-jetpack');
var projectDir;
var buildDir;
var manifest;
var appDir;

function init() {
	// Project directory is the root of the application
	projectDir = jetpack;
	// Build directory is our destination where the final build will be placed
	buildDir = projectDir.dir('./dist', { empty: true });
	// angular application directory
	appDir = projectDir.dir('./app');
	// angular application's package.json file
	manifest = appDir.read('./package.json', 'json');
	return Q();
}

function copyElectron() {
	return projectDir.copyAsync('./node_modules/electron-prebuilt/dist', buildDir.path(), { overwrite: true });
}

function cleanupRuntime() {
	return buildDir.removeAsync('resources/default_app');
}

function createAsar() {
	var deferred = Q.defer();
	asar.createPackage(appDir.path(), buildDir.path('resources/app.asar'), function () {
		deferred.resolve();
	});
	return deferred.promise;
}

function updateResources() {
	var deferred = Q.defer();

	// Copy your icon from resource folder into build folder.
	projectDir.copy('requarks-icon.ico', buildDir.path('icon.ico'));

	// Replace Electron icon for your own.
	var rcedit = require('rcedit');
	rcedit(buildDir.path('electron.exe'), {
		'icon': projectDir.path('requests-icon.ico'),
		'version-string': {
			'ProductName': manifest.name,
			'FileDescription': manifest.description,
		}
	}, function (err) {
		if (!err) {
			deferred.resolve();
		}
	});
	return deferred.promise;
}
//Rename the electron exe
function rename() {
	return buildDir.renameAsync('electron.exe', manifest.name + '.exe');
}

function build() {
	return init()
            .then(copyElectron)
            .then(cleanupRuntime)
            .then(createAsar)
            .then(updateResources)
            .then(rename);
}
module.exports = { build: build };
