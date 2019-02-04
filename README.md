# [![Build Status][travis-image]][travis-url]

> generate an OpenFin installer or link




## Install

```sh
$ npm install --save openfin-installer
```


## Usage

```js
var openfinInstaller = require('openfin-installer')({...your config obj...});

openfinInstaller.generateInstallUrl(<NAME HERE>,<YOUR CONFIG URL HERE>);

openfinInstaller.fetchInstaller({
	destination: 'dist',
	name: 'my-installer.zip'
})
.then(function(zip){
	// do something with the returned file if you want
},
function(reason){
	// handle error
});

```


## License
MIT

The code in this repository is covered by the included license.

However, if you run this code, it may call on the OpenFin RVM or OpenFin Runtime, which are covered by OpenFin’s Developer, Community, and Enterprise licenses. You can learn more about OpenFin licensing at the links listed below or just email us at support@openfin.co with questions.

https://openfin.co/developer-agreement/ <br/>
https://openfin.co/licensing/

## Support
Please enter an issue in the repo for any questions or problems. Alternatively, please contact us at support@openfin.co 

[travis-url]: https://travis-ci.org/openfin/openfin-installer.svg
[travis-image]: https://api.travis-ci.org/openfin/openfin-installer.svg?branch=master
