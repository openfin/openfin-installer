'use strict';

var fs = require('fs'),
		q = require('q'),
		path = require('path'),
		https = require('https');

var url = [
	'https://install.openfin.co/download?',
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
 * @param  {object} configTarget Override the default config target from the app.json
 * @param  {string} fileName Override the default name from app.json
 * @return {string} A configured url pointing to a web service that will generate an installer 
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
 * @param  {object} options Optional object that can define a name and write destination 
 * @return {object} A q promise
 */
var fetchInstaller = function(options){

	options = options || {
		name: appJSON.startup_app.name + '-installer'
	};
	
	options.destination = options.destination || '.';
	
	var deferred = q.defer(),
			resolvedName = options.name || appJSON.startup_app.name + '-installer',
			target =  generateInstallUrl(resolvedName),
			filePath = path.join(options.destination,  resolvedName + '.zip'),
			zipFileStream = fs.createWriteStream(filePath);

	zipFileStream.on('error', function  () {
		deferred.reject('failed to write to destination');
	});

	https.get(target, function(response) {
	    if (response.statusCode !== 200) {
	        deferred.reject('Download Failed. Status code:' + response.statusCode);
	    } else {
	    		if (options.destination) {
	    			response.pipe(zipFileStream);
	    			zipFileStream.on('end', function  () {
							deferred.resolve(response);
						});
	    		}
	    		else {
	    			deferred.resolve(response);
	    		}
	    }
	})
	.on('error', function(e) {
	    deferred.reject('Download Failed. ' + e.toString() + '\n\nRequested Target:\n' + target);
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

