/*global describe, it*/
'use strict';

var expect = require('chai').expect;
var openfinInstaller = require('../')({
		startup_app: {
			name: 'openfin'
		},
		configUrl: '',
		installerDest: '.'
	});

describe('openfin-installer', function() {

	describe('method: generateInstallUrl', function() {
		var generateInstallUrl = openfinInstaller.generateInstallUrl;

		describe('shape', function() {
			it('should exist', function() {
				expect(generateInstallUrl).to.exist();
			});
		});

		describe('behavior', function() {
			it('should return a string', function() {
				expect(generateInstallUrl('http://google.com')).to.be.a('string');
			});

			it('should return a default reachable link to the hello openfin app', function() {
				var validLInk = 'https://install.openfin.co/download?fileName=openfin-installer&config=https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/app.json';
				expect(generateInstallUrl('openfin-installer')).to.equal(validLInk);
			});
		}); //end behavior description 
	}); //end generateInstallUrl


	describe('method: fetchInstaller', function() {
		var fetchInstaller = openfinInstaller.fetchInstaller;

		describe('shape', function() {
			it('should exist', function() {
				expect(fetchInstaller).to.exist();		
			});
		});

		describe('behavior', function() {

			/* and example */
			// fetchInstaller({
			// 	destination: 'test',
			// 	name: 'wakawaka'
			// })
			// .then(function(zip){
			// 	console.log('hey hey hey', typeof zip);
			// },
			// function(reason){
			// 	console.log(reason);
			// });
		
			it('should return a promise', function() {
				var returnPromise = fetchInstaller();
				//if (options instanceof Promise) {
				expect(returnPromise.then).to.exist();
			});
		});
	});
});
