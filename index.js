'use strict';

var request = require('request'),
		fs = require('fs'),
		q = require('q'),
		path = require('path');

var url = [
	'https://dl.openfin.co/services/download?',
	'fileName=',
	'openfin-installer',
	'&config=',
	'https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/app.json'
	],
	FILE_NAME = 2,
	CONFIG = 4,
	appJSON = {
		startup_app: {
			name: 'openfin'
		},
		configUrl: ''
	};

/**
 * generateInstallUrl
 * 
 * @param  {object} configTarget override the default config target from the app.json
 * @param  {string} fileName override the default name from app.json
 * @return {string} a configured url pointing to a web service that will generate an installer 
 */
var generateInstallUrl = function(fileName, configTarget ){
	var configuredUrl = url.slice(0);

	configuredUrl[FILE_NAME] = fileName || appJSON.startup_app.name || configuredUrl[FILE_NAME];
	configuredUrl[CONFIG] = configTarget || appJSON.configTarget || configuredUrl[CONFIG];

	return configuredUrl.join('');
};


/**
 * fetchInstaller 
 *
 * Return a promise that resolves to a zip obtained via http(s) request
 * @param  {object} options @optional Object that can define a name and write destination 
 * @return {object}         A q promise
 */
var fetchInstaller = function(options){

	options = options || {
		name: appJSON.startup_app.name + '-installer'
	};
	
	var deferred = q.defer(),
			resolvedName = options.name || appJSON.startup_app.name + '-installer',
			target =  generateInstallUrl(resolvedName);

	request(target, function(error, response, payload){
		if (error && response.statusCode === 200) {
			deferred.reject(error);
		}

		if (options.destination) {
			var filePath = path.join(options.destination,  resolvedName + '.zip');
			fs.writeFile(filePath, payload, function(err){
				if (err){
					deferred.reject(err);
				}
			});
		}

		deferred.resolve(payload);
	});

	return deferred.promise;
};


module.exports = function(configJSON/*, options*/){
	appJSON = configJSON;

	return {
		generateInstallUrl : generateInstallUrl,
		fetchInstaller: fetchInstaller
	};
};

