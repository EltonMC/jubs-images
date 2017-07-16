
'use strict';

const helper = require('./helper');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.get('/', function (request, response) {
			var azure = require('azure-storage');
			var blobService = azure.createBlobService();
			blobService.createContainerIfNotExists('taskcontainer', {
			publicAccessLevel: 'blob'
			}, function(error, result, response) {
			if (!error) {
				// if result = true, container was created.
				// if result = false, container already existed.
			}
			});
			response.send("Server Images ON!");
		});
	}

	routesConfig(){
		this.appRoutes();
	}

}

module.exports = Routes;